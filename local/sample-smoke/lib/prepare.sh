#!/usr/bin/env bash
# Prepare a runnable workdir from a docs code sample.
# Usage: prepare.sh <src-file> <workdir> <lang-id> <api-key> <api-secret> <api-host>
set -euo pipefail

SRC="${1:?src}"
WORKDIR="${2:?workdir}"
LANG_ID="${3:?lang}"
API_KEY="${4:?key}"
API_SECRET="${5:?secret}"
API_HOST="${6:?host}"

mkdir -p "$WORKDIR"
API_HOST="${API_HOST%/}"

case "$LANG_ID" in
  curl) dest="$WORKDIR/sample.sh" ;;
  csharp) dest="$WORKDIR/Program.cs" ;;
  java) dest="$WORKDIR/Sample.java" ;;
  javascript) dest="$WORKDIR/sample.js" ;;
  php) dest="$WORKDIR/sample.php" ;;
  python) dest="$WORKDIR/sample.py" ;;
  ruby) dest="$WORKDIR/sample.rb" ;;
  *) echo "Unknown lang: $LANG_ID" >&2; exit 1 ;;
esac

export PREPARE_SRC="$SRC"
export PREPARE_DEST="$dest"
export PREPARE_API_KEY="$API_KEY"
export PREPARE_API_SECRET="$API_SECRET"
export PREPARE_API_HOST="$API_HOST"
export PREPARE_LANG="$LANG_ID"

python3 - <<'PY'
import os
from pathlib import Path

src = Path(os.environ["PREPARE_SRC"])
dest = Path(os.environ["PREPARE_DEST"])
key = os.environ["PREPARE_API_KEY"]
secret = os.environ["PREPARE_API_SECRET"]
host = os.environ["PREPARE_API_HOST"]
text = src.read_text(encoding="utf-8")
text = text.replace("YOUR_API_KEY", key)
text = text.replace("YOUR_API_SECRET", secret)
# Replace host only in quoted literals so comments keep YOUR_API_HOST
for q in ("'", '"'):
    text = text.replace(f"{q}YOUR_API_HOST{q}", f"{q}{host}{q}")

if os.environ["PREPARE_LANG"] == "python":
    indented = "\n".join(("    " + line if line else line) for line in text.splitlines())
    text = (
        "import urllib.error\n"
        "try:\n"
        f"{indented}\n"
        "except urllib.error.HTTPError as e:\n"
        "    print(e.code)\n"
        "    body = e.read().decode(errors=\"replace\")\n"
        "    print(body)\n"
        "except urllib.error.URLError as e:\n"
        "    print(\"URL_ERROR\", e.reason)\n"
        "    raise\n"
    )

# Docs curl samples only print the body; append http_code for smoke evidence.
if os.environ["PREPARE_LANG"] == "curl" and "%{http_code}" not in text:
    text = text.replace("curl -sS ", 'curl -sS -w "\\n%{http_code}\\n" ', 1)

dest.write_text(text, encoding="utf-8")
if os.environ["PREPARE_LANG"] == "curl":
    dest.chmod(dest.stat().st_mode | 0o111)
print(dest)
PY
