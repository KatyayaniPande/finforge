#!/usr/bin/env bash

# Install uv if not present
if ! command -v uv >/dev/null 2>&1; then
    echo "uv not installed. Installing..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
fi

# Python setup
echo "Creating python virtual environment..."
uv venv
source .venv/bin/activate

echo "Syncing dependencies..."
uv sync --no-dev

# Node.js setup with pnpm
echo "Installing frontend dependencies with pnpm..."
if ! command -v pnpm >/dev/null 2>&1; then
    echo "pnpm not installed. Please install pnpm first."
    exit 1
fi

pnpm install
pnpm dev &

# Start the Python backend
uvicorn agentApp.main:app --reload