$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..")).Path
Set-Location $Root

$pagesDir   = Join-Path $Root "src\pages"
$skipDir    = Join-Path $Root ".gh-pages-skip"
$ghCache    = Join-Path $Root "node_modules\.cache\gh-pages"
$distDir    = Join-Path $Root "dist-gh-pages"
$repoUrl    = "https://github.com/Dev-InSoft-web/ISA-DOC.git"
$branch     = "gh-pages"

# Rutas que NO pueden generarse en estatico (endpoints + dashboards que dependen de API)
$skipPaths  = @("api", "db", "test")

function Move-Skipped {
    if (-not (Test-Path $skipDir)) { New-Item -ItemType Directory -Path $skipDir | Out-Null }
    foreach ($name in $skipPaths) {
        $src = Join-Path $pagesDir $name
        if (Test-Path $src) {
            $dst = Join-Path $skipDir $name
            if (Test-Path $dst) { Remove-Item -Recurse -Force $dst }
            Move-Item -Path $src -Destination $dst
            Write-Host "  ~ apartado src/pages/$name"
        }
    }
}

function Restore-Skipped {
    if (-not (Test-Path $skipDir)) { return }
    foreach ($name in $skipPaths) {
        $src = Join-Path $skipDir $name
        if (Test-Path $src) {
            $dst = Join-Path $pagesDir $name
            if (Test-Path $dst) { Remove-Item -Recurse -Force $dst }
            Move-Item -Path $src -Destination $dst
            Write-Host "  ~ restaurado src/pages/$name"
        }
    }
    Remove-Item -Recurse -Force $skipDir
}

try {
    Write-Host "== Apartando rutas no estaticas =="
    Move-Skipped

    Write-Host "== Build estatico (dist-gh-pages) =="
    npm run build:gh-pages
    if ($LASTEXITCODE -ne 0) { throw "Build fallo" }

    Write-Host "== Marcadores GitHub Pages =="
    New-Item -ItemType File -Path (Join-Path $distDir ".nojekyll") -Force | Out-Null
    # Fallback simple para rutas profundas no prerenderizadas
    $indexHtml = Join-Path $distDir "index.html"
    if (Test-Path $indexHtml) { Copy-Item -Force $indexHtml (Join-Path $distDir "404.html") }

    Write-Host "== Limpieza cache local gh-pages =="
    if (Test-Path $ghCache) { Remove-Item -Recurse -Force $ghCache }

    Write-Host "== Publicando en $repoUrl ($branch) =="
    npx -y gh-pages -d dist-gh-pages -b $branch -t -r $repoUrl
    if ($LASTEXITCODE -ne 0) { throw "gh-pages fallo" }

    Write-Host "OK: publicado en https://dev-insoft-web.github.io/ISA-DOC/"
}
finally {
    Write-Host "== Restaurando rutas apartadas =="
    Restore-Skipped
}
