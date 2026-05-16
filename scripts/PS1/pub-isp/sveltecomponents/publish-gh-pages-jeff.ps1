$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..\..\..\..\ISP-SvelteComponents")).Path
Set-Location $Root

npm run build:gh-pages
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Limpia cache local de gh-pages para evitar "branch 'gh-pages' already exists"
$ghPagesCache = Join-Path $Root "node_modules\.cache\gh-pages"
if (Test-Path $ghPagesCache) { Remove-Item -Recurse -Force $ghPagesCache }

npx gh-pages -d gh-pages-dist -b gh-pages -t -r https://github.com/Dev-InSoft-web/ISP-SvelteComponents.git
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Limpia de nuevo antes del segundo deploy (repo Dev-InSoft)
if (Test-Path $ghPagesCache) { Remove-Item -Recurse -Force $ghPagesCache }

# Publica tambien en el repo origen Dev-InSoft (reutiliza el build ya generado)
npx gh-pages -d gh-pages-dist -b gh-pages -t
exit $LASTEXITCODE
