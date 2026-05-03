# ============================================================================
# update-all-local.ps1
# ============================================================================
# Actualiza localmente (sin publicar en npm) todos los paquetes ISP en los
# proyectos consumidores:
#   1) ISP-ClientesIS + ISP-CLientesISServer  -> ISS / ISW node_modules
#   2) ISP-SvelteComponents                   -> ISW / ISA-DOC node_modules
#
# No ejecuta npm publish. Cada subscript compila el paquete fuente y copia
# package.json + dist al node_modules del consumidor.
# ============================================================================

param(
    [switch]$SkipSvelteBuild
)

$ErrorActionPreference = "Stop"

$ScriptsDir = $PSScriptRoot
$syncClientesIS = Join-Path $ScriptsDir "sync-local-isp-clientesis.ps1"
$relationSvelte = Join-Path $ScriptsDir "pub-isp\sveltecomponents\relation-local.ps1"

foreach ($p in @($syncClientesIS, $relationSvelte)) {
    if (-not (Test-Path -LiteralPath $p)) {
        throw "No se encontro el script: $p"
    }
}

Write-Host "=== [1/2] Sync local ISP-ClientesIS / ISP-CLientesISServer ===" -ForegroundColor Cyan
& $syncClientesIS
if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
    throw "sync-local-isp-clientesis.ps1 fallo (exit $LASTEXITCODE). Se aborta."
}

Write-Host "`n=== [2/2] Sync local ISP-SvelteComponents ===" -ForegroundColor Cyan
if ($SkipSvelteBuild) {
    & $relationSvelte -SkipBuild
}
else {
    & $relationSvelte
}
if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
    throw "relation-local.ps1 fallo (exit $LASTEXITCODE)."
}

Write-Host "`nActualizacion local completa de todos los ISP." -ForegroundColor Green
