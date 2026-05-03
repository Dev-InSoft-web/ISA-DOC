# Publica en orden:
#   1) @ingenieria_insoft/ispclientesisserver  (pub-ispclientesisserver.ps1)
#   2) @ingenieria_insoft/ispclientesis        (pub-ispclientesis.ps1)
# Cada subscript pide su propia confirmacion (password "1234").

$ErrorActionPreference = "Stop"

$ScriptsDir = $PSScriptRoot
$pubServer  = Join-Path $ScriptsDir "pub-ispclientesisserver.ps1"
$pubCli     = Join-Path $ScriptsDir "pub-ispclientesis.ps1"

foreach ($p in @($pubServer, $pubCli)) {
	if (-not (Test-Path -LiteralPath $p)) {
		throw "No se encontro el script: $p"
	}
}

[Console]::WriteLine("=== [1/2] Publicando ISP-CLientesISServer ===")
& $pubServer
if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
	throw "pub-ispclientesisserver.ps1 fallo (exit $LASTEXITCODE). Se aborta."
}

[Console]::WriteLine("")
[Console]::WriteLine("=== [2/2] Publicando ISP-ClientesIS ===")
& $pubCli
if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
	throw "pub-ispclientesis.ps1 fallo (exit $LASTEXITCODE)."
}

[Console]::WriteLine("")
[Console]::WriteLine("Publicacion completa de ambos paquetes ISP.")
