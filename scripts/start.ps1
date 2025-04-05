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

uvicorn agentApp.main:app --reload
