#!/usr/bin/env bash
set -euo pipefail
mkdir -p /tmp/smoke
cp /work/Sample.java /tmp/smoke/Sample.java
cd /tmp/smoke
javac Sample.java
exec java Sample
