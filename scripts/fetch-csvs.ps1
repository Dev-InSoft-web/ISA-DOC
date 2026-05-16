# Foto de la BD viva: cada CSV se baja desde la propia tabla destino,
# para usarla como semilla en futuros reinicios.
$tables = @(
  'CAPAC_DRIVERS',
  'CAPAC_PLANES_ESTUDIO',
  'CAPAC_CURSOS',
  'CAPAC_CURSOS_DE_PLANES_ESTUDIO',
  'CAPAC_CURSOS_PREREQUISITOS',
  'CAPAC_ATRIBUTOS_X_DRIVERS',
  'CAPAC_SEGURIDADES_CURSOS',
  'CAPAC_PLANES_CURSOS',
  'CAPAC_ATRIBUTOS_PLANES',
  'CAPAC_ESTRUCTURAS_CURSOS'
)
$dst = Join-Path $PSScriptRoot "..\src\lib\migration\csv"
$dst = (Resolve-Path -LiteralPath (New-Item -ItemType Directory -Force -Path $dst)).Path
$stamp = (Get-Date).ToString('yyyyMMddHHmmss')
foreach ($t in $tables) {
  $body = @{ tableName = $t } | ConvertTo-Json -Compress
  try {
    $r = Invoke-WebRequest -Uri "http://localhost:4400/api/db/csv-table" -Method POST -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -UseBasicParsing -ErrorAction Stop
    $jsonText = [System.Text.Encoding]::UTF8.GetString($r.RawContentStream.ToArray())
    $j = $jsonText | ConvertFrom-Json
    if ($j.ok) {
      $path = Join-Path $dst "$stamp-$t.csv"
      [System.IO.File]::WriteAllText($path, $j.csv, [System.Text.UTF8Encoding]::new($false))
      Write-Host "OK $t  $($j.rowCount) filas -> $path"
    } else {
      Write-Host "ERR $t  $($j.error)"
    }
  } catch {
    Write-Host "FAIL $t  $($_.Exception.Message)"
  }
}
