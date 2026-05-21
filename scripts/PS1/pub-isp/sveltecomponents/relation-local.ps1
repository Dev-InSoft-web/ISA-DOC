param(
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

Write-Host "Relacion local de @ingenieria_insoft/ispsveltecomponents" -ForegroundColor Cyan

$PackageRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..\..\ISP-SvelteComponents")).Path
$PackageFolder = "node_modules\@ingenieria_insoft\ispsveltecomponents"
$DistDir = Join-Path $PackageRoot "dist"

function Invoke-Build {
    param([string]$WorkingDir)
    Write-Host "`nCompilando paquete..." -ForegroundColor Yellow
    Push-Location $WorkingDir
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) {
            throw "npm run build fallo con codigo $LASTEXITCODE"
        }
    }
    finally {
        Pop-Location
    }
    Write-Host "Build completado." -ForegroundColor Green
}

function Resolve-ConsumerProjects {
    # Consumidores fijos (agregar aquí nuevos proyectos delegados)
    $hardcodedProjects = @(
        "C:\Users\JAGUDELOE\Documents\Contapyme\ClientesIS\ISW-ClientesIS",
        "C:\Users\JAGUDELOE\Documents\Contapyme\ClientesIS\doc\ISA-DOC"
    )

    $resolved = @()
    foreach ($p in $hardcodedProjects) {
        if (Test-Path (Join-Path $p "package.json")) {
            $resolved += (Resolve-Path $p | Select-Object -ExpandProperty Path)
        }
        else {
            Write-Host "Proyecto consumidor no encontrado (omitido): $p" -ForegroundColor Yellow
        }
    }

    return $resolved | Sort-Object -Unique
}

function Sync-PackageToConsumer {
    param([string]$ConsumerProjectPath)

    $targetPackageDir = Join-Path $ConsumerProjectPath $PackageFolder
    Write-Host "`nSincronizando en: $ConsumerProjectPath" -ForegroundColor Magenta
    Write-Host "Destino paquete: $targetPackageDir" -ForegroundColor Gray

    if (!(Test-Path $targetPackageDir)) {
        New-Item -ItemType Directory -Path $targetPackageDir -Force | Out-Null
    }
    else {
        Remove-Item "$targetPackageDir\*" -Recurse -Force -ErrorAction SilentlyContinue
    }

    $sourcePackageJson = Join-Path $PackageRoot "package.json"
    if (Test-Path $sourcePackageJson) {
        Copy-Item $sourcePackageJson -Destination $targetPackageDir -Force
    }

    $targetDistDir = Join-Path $targetPackageDir "dist"
    if (!(Test-Path $targetDistDir)) {
        New-Item -ItemType Directory -Path $targetDistDir -Force | Out-Null
    }
    Copy-Item "$DistDir\*" -Destination $targetDistDir -Recurse -Force

    $indexDtsPath = Join-Path $targetDistDir "index.d.ts"
    if (Test-Path $indexDtsPath) {
        $dtsContent = Get-Content $indexDtsPath -Raw -Encoding UTF8
        if ($dtsContent -notmatch "export default") {
            $dtsContent += "`n`n// Exportacion por defecto para que TypeScript reconozca el modulo`nexport default {};`n"
            Set-Content $indexDtsPath $dtsContent -Encoding UTF8
        }
    }

    Write-Host "Sincronizacion completada en $ConsumerProjectPath" -ForegroundColor Green
}

if (!(Test-Path (Join-Path $PackageRoot "package.json"))) {
    throw "No se encontro package.json en $PackageRoot"
}

if (-not $SkipBuild) {
    Invoke-Build -WorkingDir $PackageRoot
}
elseif (!(Test-Path $DistDir)) {
    throw "No existe dist en $DistDir. Quita -SkipBuild o genera build primero."
}

$consumerProjects = Resolve-ConsumerProjects
if (-not $consumerProjects -or $consumerProjects.Count -eq 0) {
    throw "No se encontraron proyectos consumidores ISW-*."
}

Write-Host "`nConsumidores detectados:" -ForegroundColor Blue
$consumerProjects | ForEach-Object { Write-Host " - $_" -ForegroundColor Gray }

foreach ($project in $consumerProjects) {
    Sync-PackageToConsumer -ConsumerProjectPath $project
}

Write-Host "`nProceso finalizado para $($consumerProjects.Count) proyecto(s)." -ForegroundColor Cyan
