$sql = @"
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME IN ('CAPAC_PLANES_ESTUDIO','CAPAC_PLANES_CURSOS')
ORDER BY TABLE_NAME, ORDINAL_POSITION
"@
$body = @{ sql = $sql } | ConvertTo-Json -Compress
$r = Invoke-WebRequest -Uri "http://localhost:4400/api/db/query" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
$j = $r.Content | ConvertFrom-Json
$j.recordset | Format-Table -AutoSize
