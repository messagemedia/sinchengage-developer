#!/usr/bin/env bash
set -euo pipefail
# Workdir mount is /work with Program.cs; build a throwaway console app around it.
rm -rf /tmp/smoke
mkdir -p /tmp/smoke
cd /tmp/smoke
dotnet new console -n Smoke -o . --force >/dev/null
cp /work/Program.cs ./Program.cs
# Top-level statements conflict if template left Program.cs with namespace — we overwrite fully.
dotnet run --verbosity quiet
