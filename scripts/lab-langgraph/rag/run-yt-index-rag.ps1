param([switch]$Replace)

$ErrorActionPreference = "Continue"
$isaDoc = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
Set-Location $isaDoc

$env:RAG_EMBED_BATCH_SIZE = if ($env:RAG_EMBED_BATCH_SIZE) { $env:RAG_EMBED_BATCH_SIZE } else { "32" }
$env:RAG_EMBED_BATCH_DELAY_MS = if ($env:RAG_EMBED_BATCH_DELAY_MS) { $env:RAG_EMBED_BATCH_DELAY_MS } else { "2000" }

$logDir = Join-Path $PSScriptRoot "logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$log = Join-Path $logDir ("yt-index-{0:yyyyMMdd-HHmmss}.log" -f (Get-Date))

Write-Host "ISA-DOC: $isaDoc"
Write-Host "Log: $log"
Write-Host "batch=$($env:RAG_EMBED_BATCH_SIZE) delay=$($env:RAG_EMBED_BATCH_DELAY_MS)ms replace=$Replace"
Write-Host ""

$npmArgs = if ($Replace) { @("--", "--replace") } else { @("--", "--append") }
npm run lab:yt:index-rag @npmArgs 2>&1 | Tee-Object -FilePath $log
$code = $LASTEXITCODE
Write-Host ""
Write-Host "Fin exit=$code · log=$log"
exit $code
