# Publica @ingenieria_insoft/ispclientesisserver en npm:
# 1) Ajusta temporalmente "deploy" en package.json a: npm run build && npm publish
# 2) Copia .npmrc-publicar.npmrc -> .npmrc (token de publicación)
# 3) Ejecuta isnode deploy
# 4) Restaura .npmrc desde .npmrc-descargar.npmrc y el script "deploy" fijo en package.json
# 5) git add ., commit y push (mismo mensaje; pide confirmación con password "1234")

$ErrorActionPreference = "Stop"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..\..\ClientesIS\ISP-CLientesISServer")).Path
Set-Location $Root

$packagePath = Join-Path $Root "package.json"
$pkgJson = Get-Content -LiteralPath $packagePath -Raw | ConvertFrom-Json
$ver = $pkgJson.version
$msg = "fix(package): actualiza a $ver"

[Console]::WriteLine("")
[Console]::WriteLine("Se publicara en npm y se ejecutara git add ., git commit y git push con este mensaje:")
[Console]::WriteLine($msg)
[Console]::Out.Flush()
$password = Read-Host "Ingrese contrasena de confirmacion"
if ($password -ne "1234") {
	[Console]::WriteLine("Contrasena incorrecta. Operacion cancelada.")
	return
}

$npmrcPath = Join-Path $Root ".npmrc"
$npmrcSrc = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..\backups\npmrc")).Path
$npmrcPublicar = Join-Path $npmrcSrc ".npmrc-publicar.backup"
$npmrcDescargar = Join-Path $npmrcSrc ".npmrc-descargar.backup"

$deployPublish = "npm run build && npm publish"
$deployRestore = "npm update && npm run build && npm publish && npm run git"

if (-not (Test-Path $packagePath)) { throw "No se encontro package.json en $Root" }
if (-not (Test-Path $npmrcPublicar)) { throw "No se encontro .npmrc-publicar.backup" }
if (-not (Test-Path $npmrcDescargar)) { throw "No se encontro .npmrc-descargar.backup" }

$pkgText = [System.IO.File]::ReadAllText($packagePath)
if ($pkgText -notmatch '"deploy"\s*:\s*"[^"]*"') {
	throw 'No se pudo encontrar scripts.deploy en package.json'
}

$pkgTextPublish = [regex]::Replace(
	$pkgText,
	'("deploy"\s*:\s*)"[^"]*"',
	{ param($m) $m.Groups[1].Value + '"' + $deployPublish + '"' }
)

function Write-Utf8NoBom {
	param([string]$Path, [string]$Content)
	$utf8 = New-Object System.Text.UTF8Encoding $false
	[System.IO.File]::WriteAllText($Path, $Content, $utf8)
}

Write-Utf8NoBom -Path $packagePath -Content $pkgTextPublish
Copy-Item -LiteralPath $npmrcPublicar -Destination $npmrcPath -Force

$deployOk = $false
$deployErrMsg = $null
try {
	& isnode deploy 2>&1 | Tee-Object -Variable deployOutput | Out-Host
	$deployExit = $LASTEXITCODE
	$joined = ($deployOutput | Out-String)
	$errPattern = 'npm error|npm ERR!|E401|E403|E404|Unauthorized|Forbidden|404 Not Found|cannot publish over'
	$hasErr = $joined -match $errPattern
	if ($null -ne $deployExit -and $deployExit -ne 0) {
		$deployErrMsg = "isnode deploy termino con codigo $deployExit"
	}
	elseif ($hasErr) {
		$deployErrMsg = "Se detectaron errores de npm en la salida (exit 0 enganoso)"
	}
	else {
		$deployOk = $true
	}
}
catch {
	$deployErrMsg = $_.Exception.Message
}
finally {
	Copy-Item -LiteralPath $npmrcDescargar -Destination $npmrcPath -Force

	$currentPkg = [System.IO.File]::ReadAllText($packagePath)
	$pkgTextRestore = [regex]::Replace(
		$currentPkg,
		'("deploy"\s*:\s*)"[^"]*"',
		{ param($m) $m.Groups[1].Value + '"' + $deployRestore + '"' }
	)
	Write-Utf8NoBom -Path $packagePath -Content $pkgTextRestore
}

if ($deployOk) {
	$pkgJson = Get-Content -LiteralPath $packagePath -Raw | ConvertFrom-Json
	$ver = $pkgJson.version
	$msg = "fix(package): actualiza a $ver"
	[Console]::WriteLine("")
	[Console]::WriteLine("Autocommit automatico: se ejecutara git add ., git commit y git push con este mensaje:")
	[Console]::WriteLine($msg)
	[Console]::Out.Flush()
	git add .
	git commit -m "$msg"
	if ($null -ne $LASTEXITCODE -and $LASTEXITCODE -ne 0) {
		throw "git commit termino con codigo $LASTEXITCODE"
	}
	git push origin main
	if ($null -ne $LASTEXITCODE -and $LASTEXITCODE -ne 0) {
		throw "git push termino con codigo $LASTEXITCODE"
	}
}
else {
	Write-Host ""
	Write-Host "==================== ERROR DE PUBLICACION ====================" -ForegroundColor Red
	Write-Host "npm publish FALLO. NO se hara git commit ni git push." -ForegroundColor Red
	if ($deployErrMsg) {
		Write-Host "Detalle: $deployErrMsg" -ForegroundColor Red
	}
	Write-Host "Revise la salida de 'isnode deploy' arriba para mas contexto." -ForegroundColor Red
	Write-Host "==============================================================" -ForegroundColor Red
	exit 1
}
