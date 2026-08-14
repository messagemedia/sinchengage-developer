#!/usr/bin/env bash
# Local Engage code-sample smoke runner.
# Usage: ./run.sh [--all] [--lang a,b] [--method GET,POST]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$ROOT/../.." && pwd)"
SAMPLES="$REPO/spec/code_samples"
MATRIX="$ROOT/matrix.json"
PREPARE="$ROOT/lib/prepare.sh"

RUN_ALL=0
LANG_FILTER=""
METHOD_FILTER=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --all) RUN_ALL=1; shift ;;
    --lang) LANG_FILTER="${2:-}"; shift 2 ;;
    --method) METHOD_FILTER="${2:-}"; shift 2 ;;
    -h|--help)
      sed -n '1,80p' "$ROOT/README.md"
      exit 0
      ;;
    *) echo "Unknown arg: $1" >&2; exit 1 ;;
  esac
done

if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env"
  set +a
fi

: "${API_KEY:?Set API_KEY in .env or environment}"
: "${API_SECRET:?Set API_SECRET in .env or environment}"
: "${API_HOST:?Set API_HOST in .env or environment}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required" >&2
  exit 1
fi
if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required for prepare.sh" >&2
  exit 1
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required to read matrix.json" >&2
  exit 1
fi

chmod +x "$PREPARE" \
  "$ROOT/docker/java/entrypoint.sh" \
  "$ROOT/docker/csharp/entrypoint.sh"

RUN_ID="$(date -u +%Y%m%dT%H%M%SZ)"
EVIDENCE="$ROOT/evidence/$RUN_ID"
WORKDIR_ROOT="$ROOT/.work/$RUN_ID"
mkdir -p "$EVIDENCE" "$WORKDIR_ROOT"

contains_csv() {
  local csv="$1" item="$2"
  [[ -z "$csv" ]] && return 0
  local IFS=,
  for x in $csv; do
    [[ "$x" == "$item" ]] && return 0
  done
  return 1
}

# Unique cell id from lang + sample path relative to language folder (no ext).
# e.g. csharp + v1@messages/post -> csharp__v1@messages__post
cell_id() {
  local lang_id="$1" rel_no_ext="$2"
  local sanitized="${rel_no_ext//\//__}"
  printf '%s__%s' "$lang_id" "$sanitized"
}

run_cell() {
  local lang_id="$1" image="$2" src_rel="$3" method="$4"
  local src="$REPO/$src_rel"
  # Path after language folder, without extension (e.g. v1@messages/post).
  local after_lang="${src_rel#spec/code_samples/}"
  after_lang="${after_lang#*/}"
  after_lang="${after_lang%.*}"
  local cell
  cell="$(cell_id "$lang_id" "$after_lang")"
  local log="$EVIDENCE/${cell}.log"
  local work="$WORKDIR_ROOT/$cell"
  mkdir -p "$work"

  {
    echo "=== $cell ==="
    echo "sample_file: $src_rel"
    echo "method: $method"
    echo "host: $API_HOST"
    echo
  } >"$log"

  if [[ ! -f "$src" ]]; then
    echo "FAIL missing sample: $src_rel" | tee -a "$log"
    fail_count=$((fail_count + 1))
    SUMMARY_LINES+=("$cell FAIL missing-sample sample_file=$src_rel")
    return 0
  fi

  echo "==> $cell"
  if ! "$PREPARE" "$src" "$work" "$lang_id" "$API_KEY" "$API_SECRET" "$API_HOST" >/dev/null 2>>"$log"; then
    echo "FAIL prepare" | tee -a "$log"
    fail_count=$((fail_count + 1))
    SUMMARY_LINES+=("$cell FAIL prepare sample_file=$src_rel")
    return 0
  fi

  if [[ "$lang_id" == "javascript" ]]; then
    printf '%s\n' '{"type":"module"}' >"$work/package.json"
  fi

  set +e
  docker run --rm \
    -v "$work:/work:ro" \
    "$image" >>"$log" 2>&1
  local rc=$?
  set -e

  echo "exit_code=$rc" >>"$log"

  # Prefer an explicit HTTP status (other langs print it; curl wrapper adds %{http_code}).
  # Also accept URL_ERROR (network) as fail, and exit 0 with JSON-ish body as pass.
  # Path placeholders (YOUR_* IDs) stay literal; 4xx/5xx still count as PASS.
  local has_status=0 has_url_error=0 has_json_body=0
  grep -E -q '(^|[^0-9])([1-5][0-9]{2})([^0-9]|$)' "$log" && has_status=1
  grep -E -q '^URL_ERROR' "$log" && has_url_error=1
  grep -E -q '\{|\[|"message"' "$log" && has_json_body=1

  if [[ $has_url_error -eq 1 && $has_status -eq 0 ]]; then
    fail_count=$((fail_count + 1))
    SUMMARY_LINES+=("$cell FAIL network sample_file=$src_rel")
    echo "FAIL $cell (network)"
  elif [[ $has_status -eq 1 || ( $rc -eq 0 && $has_json_body -eq 1 ) ]]; then
    pass_count=$((pass_count + 1))
    SUMMARY_LINES+=("$cell PASS sample_file=$src_rel")
    echo "PASS $cell"
  elif [[ $rc -eq 0 ]]; then
    fail_count=$((fail_count + 1))
    SUMMARY_LINES+=("$cell FAIL no-http-status sample_file=$src_rel")
    echo "FAIL $cell (no HTTP status in output)"
  else
    fail_count=$((fail_count + 1))
    SUMMARY_LINES+=("$cell FAIL exit=$rc sample_file=$src_rel")
    echo "FAIL $cell (exit $rc)"
  fi
}

echo "==> Building Docker images (cached)"
docker build -q -t sample-smoke-curl "$ROOT/docker/curl" >/dev/null
docker build -q -t sample-smoke-python "$ROOT/docker/python" >/dev/null
docker build -q -t sample-smoke-javascript "$ROOT/docker/javascript" >/dev/null
docker build -q -t sample-smoke-php "$ROOT/docker/php" >/dev/null
docker build -q -t sample-smoke-ruby "$ROOT/docker/ruby" >/dev/null
docker build -q -t sample-smoke-java "$ROOT/docker/java" >/dev/null
docker build -q -t sample-smoke-csharp "$ROOT/docker/csharp" >/dev/null

pass_count=0
fail_count=0
SUMMARY_LINES=()

lang_count="$(jq '.languages | length' "$MATRIX")"

if [[ "$RUN_ALL" -eq 1 ]]; then
  echo "==> Mode: all samples under spec/code_samples/"
  for ((li = 0; li < lang_count; li++)); do
    lang_id="$(jq -r ".languages[$li].id" "$MATRIX")"
    folder="$(jq -r ".languages[$li].folder" "$MATRIX")"
    ext="$(jq -r ".languages[$li].ext" "$MATRIX")"
    image="$(jq -r ".languages[$li].image" "$MATRIX")"

    contains_csv "$LANG_FILTER" "$lang_id" || continue

    lang_dir="$SAMPLES/$folder"
    if [[ ! -d "$lang_dir" ]]; then
      echo "WARN missing language folder: $lang_dir" >&2
      continue
    fi

    while IFS= read -r -d '' src; do
      src_rel="${src#"$REPO"/}"
      base="$(basename "$src")"
      method="$(printf '%s' "${base%.*}" | tr '[:lower:]' '[:upper:]')"
      contains_csv "$METHOD_FILTER" "$method" || continue
      run_cell "$lang_id" "$image" "$src_rel" "$method"
    done < <(find "$lang_dir" -type f -name "*${ext}" -print0 | sort -z)
  done
else
  echo "==> Mode: matrix.json"
  method_count="$(jq '.methods | length' "$MATRIX")"

  for ((li = 0; li < lang_count; li++)); do
    lang_id="$(jq -r ".languages[$li].id" "$MATRIX")"
    folder="$(jq -r ".languages[$li].folder" "$MATRIX")"
    ext="$(jq -r ".languages[$li].ext" "$MATRIX")"
    image="$(jq -r ".languages[$li].image" "$MATRIX")"

    contains_csv "$LANG_FILTER" "$lang_id" || continue

    for ((mi = 0; mi < method_count; mi++)); do
      method="$(jq -r ".methods[$mi].id" "$MATRIX")"
      rel="$(jq -r ".methods[$mi].rel" "$MATRIX")"
      contains_csv "$METHOD_FILTER" "$method" || continue

      src_rel="spec/code_samples/$folder/${rel}${ext}"
      run_cell "$lang_id" "$image" "$src_rel" "$method"
    done
  done
fi

{
  echo "run_id=$RUN_ID"
  echo "host=$API_HOST"
  echo "mode=$([ "$RUN_ALL" -eq 1 ] && echo all || echo matrix)"
  echo "pass=$pass_count fail=$fail_count"
  echo
  printf '%s\n' "${SUMMARY_LINES[@]}"
} | tee "$EVIDENCE/summary.txt"

echo
echo "Evidence: $EVIDENCE"
[[ "$fail_count" -eq 0 ]]
