# ============================================================================
# Script de Actualizacion Local - ClientesIS
# ============================================================================
# Automatiza la actualizacion local de paquetes siguiendo el procedimiento:
# 1. Compilar paquetes ISP (cliente y servidor)
# 2. Borrar solo el contenido del paquete en node_modules y copiar package.json + dist
# 3. Corregir archivos .d.ts agregando exportaciones por defecto
# (No ejecuta npm run build en ISS/ISW; compila consumidores cuando lo necesites.)
# ============================================================================

Write-Host "Iniciando actualizacion local de ClientesIS..." -ForegroundColor Cyan

# ============================================================================
# Funcion: Ejecutar Comando de Compilacion
# ============================================================================
function Invoke-BuildCommand {
    param([string]$Command, [string]$WorkingDir, [string]$Description)

    Write-Host "`n$Description" -ForegroundColor Yellow
    Write-Host "   Directorio: $WorkingDir" -ForegroundColor Gray
    Write-Host "   Comando: $Command" -ForegroundColor Cyan

    try {
        Push-Location $WorkingDir
        Invoke-Expression $Command
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   $Description completado" -ForegroundColor Green
        }
        else {
            Write-Host ("Error en $Description (Codigo: " + $LASTEXITCODE + ") - IGNORADO PARA CONTINUAR") -ForegroundColor Red
        }
    }
    catch {
        Write-Host ("Error ejecutando $Description`: " + $_.Exception.Message) -ForegroundColor Red
        exit 1
    }
    finally {
        Pop-Location
    }
}

# ============================================================================
# Funcion: Copiar Build a Node Modules (limpieza solo del contenido del paquete)
# ============================================================================
function Copy-BuildToNodeModules {
    param([string]$SourceRootDir, [string]$SourceBuildDir, [string]$TargetNodeModulesDir, [string]$PackageName)

    Write-Host "`nCopiando $PackageName..." -ForegroundColor Yellow
    Write-Host "   Package.json desde: $SourceRootDir" -ForegroundColor Gray
    Write-Host "   Archivos desde: $SourceBuildDir" -ForegroundColor Gray
    Write-Host "   Hacia: $TargetNodeModulesDir\dist\" -ForegroundColor Gray

    if (!(Test-Path $SourceBuildDir)) {
        Write-Host "   Directorio fuente no encontrado: $SourceBuildDir" -ForegroundColor Yellow
        return
    }

    # Borrar solo el contenido anterior del directorio del paquete (no elimina la carpeta padre ni el proyecto)
    if (Test-Path $TargetNodeModulesDir) {
        Write-Host "   Borrando contenido anterior..." -ForegroundColor Blue
        Remove-Item "$TargetNodeModulesDir\*" -Recurse -Force -ErrorAction SilentlyContinue
    }
    else {
        Write-Host "   Creando directorio destino..." -ForegroundColor Blue
        New-Item -ItemType Directory -Path $TargetNodeModulesDir -Force | Out-Null
    }

    try {
        $packageJsonSource = Join-Path $SourceRootDir "package.json"
        if (Test-Path $packageJsonSource) {
            $packageJsonTarget = Join-Path $TargetNodeModulesDir "package.json"
            if (Test-Path $packageJsonTarget) {
                Write-Host "   package.json ya existe en el destino, se conserva" -ForegroundColor Blue
            }
            else {
                Write-Host "   Copiando package.json..." -ForegroundColor Blue
                Copy-Item $packageJsonSource -Destination $TargetNodeModulesDir
            }
        }
        else {
            Write-Host "   package.json no encontrado en: $packageJsonSource" -ForegroundColor Yellow
        }

        $targetDistDir = Join-Path $TargetNodeModulesDir "dist"
        if (!(Test-Path $targetDistDir)) {
            New-Item -ItemType Directory -Path $targetDistDir -Force | Out-Null
        }

        $copyCommand = "Copy-Item '$SourceBuildDir\*' -Destination '$targetDistDir' -Recurse -Force"
        Write-Host "   Comando: $copyCommand" -ForegroundColor Cyan

        Invoke-Expression $copyCommand
        Write-Host "   $PackageName copiado exitosamente" -ForegroundColor Green

        $indexDtsPath = Join-Path $targetDistDir "index.d.ts"
        if (Test-Path $indexDtsPath) {
            Write-Host "   Corrigiendo index.d.ts..." -ForegroundColor Blue
            # Leer como UTF-8; sin esto, Windows puede interpretar mal bytes multibyte y corromper el archivo (TS1490).
            $dtsContent = Get-Content $indexDtsPath -Raw -Encoding UTF8

            if ($dtsContent -notmatch "export default") {
                $dtsContent += "`n`n// Exportacion por defecto para que TypeScript reconozca el modulo`nexport default {};`n"
                Set-Content $indexDtsPath $dtsContent -Encoding UTF8
                Write-Host "   Exportacion por defecto agregada a index.d.ts" -ForegroundColor Green
            }
            else {
                Write-Host "   index.d.ts ya tiene exportacion por defecto" -ForegroundColor Blue
            }

            if ($PackageName -eq "@ingenieria_insoft/ispclientesis") {
                $fixEncodingScript = Join-Path $BaseDir "scripts\fix-ispclientesis-index-dts.mjs"
                if (Test-Path $fixEncodingScript) {
                    Write-Host "   Corrigiendo codificacion en index.d.ts (ispclientesis)..." -ForegroundColor Blue
                    & node $fixEncodingScript $indexDtsPath
                }
            }
        }
    }
    catch {
        Write-Host ("Error copiando $PackageName`: " + $_.Exception.Message) -ForegroundColor Red
    }
}

# ============================================================================
# Rutas Base del Proyecto
# ============================================================================
$BaseDir = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..")).Path
$ISPDir = Join-Path $BaseDir "ISP-ClientesIS"
$ISPServerDir = Join-Path $BaseDir "ISP-CLientesISServer"
$ISSDir = Join-Path $BaseDir "ISS-ClientesIS-ContaPymeU"
$ISWDir = Join-Path $BaseDir "ISW-ClientesIS"

Write-Host "Rutas del proyecto:" -ForegroundColor Blue
Write-Host "   ISP: $ISPDir" -ForegroundColor Gray
Write-Host "   ISP-Server: $ISPServerDir" -ForegroundColor Gray
Write-Host "   ISS: $ISSDir" -ForegroundColor Gray
Write-Host "   ISW: $ISWDir" -ForegroundColor Gray

# ============================================================================
# PASO 1: Compilar ISP (Cliente)
# ============================================================================
Write-Host "`nPASO 1: Compilando ISP-ClientesIS..." -ForegroundColor Magenta

if (Test-Path $ISPDir) {
    Invoke-BuildCommand "isnode" $ISPDir "Compilando TypeScript interfaces (ISP)"
    Invoke-BuildCommand "tsc" $ISPDir "Compilando paquete (ISP)"
}
else {
    Write-Host "   Directorio ISP no encontrado: $ISPDir" -ForegroundColor Yellow
}

# ============================================================================
# PASO 2: Copiar ISP a ISP-Server
# ============================================================================
Write-Host "`nPASO 2: Copiando ISP a ISP-Server..." -ForegroundColor Magenta

$ISPBuildDir = Join-Path $ISPDir "dist"
$ISPServerNodeModules = Join-Path $ISPServerDir "node_modules\@ingenieria_insoft\ispclientesis"

Copy-BuildToNodeModules $ISPDir $ISPBuildDir $ISPServerNodeModules "@ingenieria_insoft/ispclientesis"

# ============================================================================
# PASO 3: Compilar ISP-Server
# ============================================================================
Write-Host "`nPASO 3: Compilando ISP-CLientesISServer..." -ForegroundColor Magenta

if (Test-Path $ISPServerDir) {
    Invoke-BuildCommand "isnode" $ISPServerDir "Compilando TypeScript interfaces (ISP-Server)"
    Invoke-BuildCommand "tsc" $ISPServerDir "Compilando paquete (ISP-Server)"
}
else {
    Write-Host "   Directorio ISP-Server no encontrado: $ISPServerDir" -ForegroundColor Yellow
}

# ============================================================================
# PASO 4: Copiar ISP-Server a ISS
# ============================================================================
Write-Host "`nPASO 4: Copiando ISP-Server a ISS..." -ForegroundColor Magenta

$ISPServerBuildDir = Join-Path $ISPServerDir "dist"
$ISSNodeModulesServer = Join-Path $ISSDir "node_modules\@ingenieria_insoft\ispclientesisserver"

Copy-BuildToNodeModules $ISPServerDir $ISPServerBuildDir $ISSNodeModulesServer "@ingenieria_insoft/ispclientesisserver"

# ============================================================================
# PASO 5: Copiar ISP a ISS
# ============================================================================
Write-Host "`nPASO 5: Copiando ISP a ISS..." -ForegroundColor Magenta

$ISSNodeModulesClient = Join-Path $ISSDir "node_modules\@ingenieria_insoft\ispclientesis"

Copy-BuildToNodeModules $ISPDir $ISPBuildDir $ISSNodeModulesClient "@ingenieria_insoft/ispclientesis"

# ============================================================================
# PASO 6: Copiar ISP-Server a ISW
# ============================================================================
Write-Host "`nPASO 6: Copiando ISP-Server a ISW..." -ForegroundColor Magenta

$ISWNodeModulesServer = Join-Path $ISWDir "node_modules\@ingenieria_insoft\ispclientesisserver"

Copy-BuildToNodeModules $ISPServerDir $ISPServerBuildDir $ISWNodeModulesServer "@ingenieria_insoft/ispclientesisserver"

# ============================================================================
# PASO 7: Copiar ISP a ISW
# ============================================================================
Write-Host "`nPASO 7: Copiando ISP a ISW..." -ForegroundColor Magenta

$ISWNodeModulesClient = Join-Path $ISWDir "node_modules\@ingenieria_insoft\ispclientesis"

Copy-BuildToNodeModules $ISPDir $ISPBuildDir $ISWNodeModulesClient "@ingenieria_insoft/ispclientesis"

# ============================================================================
Write-Host "`nActualizacion local completada." -ForegroundColor Cyan
Write-Host "Solo se limpio el contenido de cada paquete bajo node_modules\@ingenieria_insoft\ (package.json + dist)." -ForegroundColor Blue
Write-Host "Para compilar consumidores: npm run build (o 'npm run start' en ISS / 'npm run dev' en ISW)." -ForegroundColor Blue

# ============================================================================
# FIN DEL SCRIPT
# ============================================================================
