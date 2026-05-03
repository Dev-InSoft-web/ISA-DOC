# Publica en orden:
#   1) @ingenieria_insoft/ispclientesisserver  (pub-server.ps1)
#   2) @ingenieria_insoft/ispclientesis        (pub-cli.ps1)
# Cada subscript pide su propia confirmacion (password "1234").

$ErrorActionPreference = "Stop"

$ScriptsDir = $PSScriptRoot
$pubServer  = Join-Path $ScriptsDir "pub-server.ps1"
$pubCli     = Join-Path $ScriptsDir "pub-cli.ps1"

foreach ($p in @($pubServer, $pubCli)) {
	if (-not (Test-Path -LiteralPath $p)) {
		throw "No se encontro el script: $p"
	}
}

[Console]::WriteLine("=== [1/2] Publicando ISP-CLientesISServer ===")
& $pubServer
if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
	throw "pub-server.ps1 fallo (exit $LASTEXITCODE). Se aborta."
}

[Console]::WriteLine("")
[Console]::WriteLine("=== [2/2] Publicando ISP-ClientesIS ===")
& $pubCli
if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
	throw "pub-cli.ps1 fallo (exit $LASTEXITCODE)."
}

[Console]::WriteLine("")
[Console]::WriteLine("Publicacion completa de ambos paquetes ISP.")
