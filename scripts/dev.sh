#!/usr/bin/env bash
set -euo pipefail

# Was: cd "$(dirname "$0")"          — that's now scripts/, not the root
cd "$(dirname "$0")/.."              # ← go UP one level to the repo root

BACKEND_PID=""
FRONTEND_PID=""

cleanup() {
  echo ""
  echo "Shutting down..."
  [ -n "$FRONTEND_PID" ] && kill "$FRONTEND_PID" 2>/dev/null || true
  [ -n "$BACKEND_PID" ] && kill "$BACKEND_PID" 2>/dev/null || true
  wait 2>/dev/null || true
  exit 0
}
trap cleanup EXIT INT TERM

echo "Starting backend (Spring Boot on :8080)..."
(cd backend && ./mvnw spring-boot:run) &
BACKEND_PID=$!

echo "Starting frontend (Vite on :5173)..."
(cd frontend && npm run dev) &
FRONTEND_PID=$!

echo ""
echo "Backend:  http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop both."
echo ""

wait
