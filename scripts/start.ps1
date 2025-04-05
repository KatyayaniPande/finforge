if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Write-Output "uv not installed. Installing..."
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    $env:Path = "C:\Users\$env:USERNAME\.local\bin;$env:Path"
}

Write-Output "Creating python virtual environment..."
uv venv
. .venv/Scripts/Activate

Write-Output "Syncing dependencies..."
uv sync --no-dev

# Check if pnpm is installed
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Output "pnpm not installed. Please install pnpm first."
    exit 1
}

# Install frontend dependencies
Write-Output "Installing frontend dependencies with pnpm..."
pnpm install

# Start both services
# Start frontend in a new PowerShell window
Start-Process powershell -ArgumentList "-Command pnpm dev"

# Start the Python backend
uvicorn agentApp.main:app --reload