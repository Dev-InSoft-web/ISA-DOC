$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..\..\..\..\ISP-SvelteComponents")).Path
Set-Location $Root

npm run build:gh-pages
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

npx gh-pages -d gh-pages-dist -b gh-pages -t -r https://github.com/Jeff-Aporta/ISP-SvelteComponents.git
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Publica tambien en el repo origen Dev-InSoft (reutiliza el build ya generado)
npx gh-pages -d gh-pages-dist -b gh-pages -t
exit $LASTEXITCODE
