# Esquema BDD — Capacitación (`CAPAC_*`)

Script consolidado para inicializar el módulo de capacitación en SQL Server.

- Archivo: [`/db/init_capacitacion.sql`](/db/init_capacitacion.sql)
- Base: `CLIENTES`
- Prefijo de objetos: `CAPAC_`

## Contenido del script

1. Eliminación de índices, tablas y secuencias previas (idempotente).
2. Creación de **secuencias** para IDs:
   - `CAPAC_SEQ_IHISTORIALPLANESTUDIO`
   - `CAPAC_SEQ_IHISTORIALCURSO`
   - `CAPAC_SEQ_IDRIVER`
   - `CAPAC_SEQ_IRECURSO`
   - `CAPAC_SEQ_IATRIBUTOXTDRECURSO`
3. Creación de **tablas principales**:
   - `CAPAC_DRIVERS`
   - `CAPAC_PLANES_ESTUDIO`
   - `CAPAC_TEMAS`
   - `CAPAC_CURSOS`
   - `CAPAC_PERMISOS`
4. Creación de **tablas pivote / detalle**:
   - `CAPAC_CURSOS_DE_PLANES_ESTUDIO`
   - `CAPAC_CURSOS_PREREQUISITOS`
   - `CAPAC_ATRIBUTOS_X_DRIVERS`
   - `CAPAC_SEGURIDADES_CURSOS`
   - `CAPAC_PLANES_CURSOS`
   - `CAPAC_ATRIBUTOS_PLANES`
   - `CAPAC_ESTRUCTURAS_CURSOS`
   - `CAPAC_HISTORIALCURSO`, `CAPAC_HISTORIALPLANESTUDIO`
5. Índices secundarios para búsquedas frecuentes (`BACTIVO`, `FHCRE`, `IUSUARIOCRE`, FKs).

## Ejecución

```powershell
sqlcmd -S <servidor> -d CLIENTES -i .\public\db\init_capacitacion.sql
```

> El script es idempotente: hace `DROP IF EXISTS` antes de cada `CREATE`, por lo que **borra datos existentes** del módulo. Úsalo solo en entornos de inicialización / capacitación.
