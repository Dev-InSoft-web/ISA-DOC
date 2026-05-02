# Genera tables-tree.json, _state.json y todos los columns/*.json
# representando el esquema CAPAC_ provisto en la solicitud.

$ErrorActionPreference = "Stop"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
function Write-JsonNoBom { param($Path, $Object) [System.IO.File]::WriteAllText($Path, ($Object | ConvertTo-Json -Depth 50), $utf8NoBom) }
$root = "c:\Users\JAGUDELOE\Documents\Contapyme\ClientesIS\doc\ISA-DOC"
$colsDir = Join-Path $root "public\db\clientesis\columns"
$treeFile = Join-Path $root "public\db\clientesis\tables-tree.json"
$stateFile = Join-Path $root "public\bd\codegen\_state.json"

# ------------------------------------------------------------------
# Definicion de tablas (orden respetado en SQL).
# Cada item de "body" es una columna; "audit" = $true agrega seccion AUDITORIA
# con las 8 columnas estandar al final.
# ------------------------------------------------------------------

$auditCols = @(
    @{ name = "IUSUARIOCRE"; type = "VARCHAR(255)"; pk = $false },
    @{ name = "IAPPCRE";     type = "VARCHAR(255)"; pk = $false },
    @{ name = "IPCRE";       type = "VARCHAR(255)"; pk = $false },
    @{ name = "FHCRE";       type = "DATETIME2";   pk = $false; defaultValue = "GETDATE()" },
    @{ name = "IUSUARIOULT"; type = "VARCHAR(255)"; pk = $false },
    @{ name = "IAPPULT";     type = "VARCHAR(255)"; pk = $false },
    @{ name = "IPULT";       type = "VARCHAR(255)"; pk = $false },
    @{ name = "FHULT";       type = "DATETIME2";   pk = $false; defaultValue = "GETDATE()" }
)

$tables = @(
    @{
        ref = "DRIVERS"; audit = $true
        body = @(
            @{ name = "IDRIVER";     type = "BIGINT";       pk = $true  },
            @{ name = "NDRIVER";     type = "VARCHAR(255)"; pk = $false },
            @{ name = "DESCRIPCION"; type = "TEXT";         pk = $false },
            @{ name = "QNIVELES";    type = "TINYINT";      pk = $false }
        )
        doc = @{
            description = "Conductores/instructores que pueden ser asignados a cursos o planes."
            rules = @("`IDRIVER` es PK natural BIGINT.")
        }
    },
    @{
        ref = "PLANES_ESTUDIO"; audit = $true; stack = $true
        body = @(
            @{ name = "IPLANESTUDIO";        type = "VARCHAR(255)"; pk = $true  },
            @{ name = "NOMBRE";              type = "VARCHAR(255)"; pk = $false },
            @{ name = "DESCRIPCIONPLAN";     type = "TEXT";         pk = $false },
            @{ name = "TTDVISUALIZACION";    type = "VARCHAR(50)";  pk = $false },
            @{ name = "BACTIVO";             type = "BIT";          pk = $false; defaultValue = "1" },
            @{ name = "BGENERACERTIFICADOS"; type = "BIT";          pk = $false; defaultValue = "0" },
            @{ name = "IRECURSO";            type = "VARCHAR(255)"; pk = $false; nullable = "NULL" }
        )
        doc = @{
            description = "Plan de estudio: contenedor del modulo de capacitacion."
            rules = @("Master del dominio Planes Estudio.", "stack:true emite tabla virtual HISTORIALPLANESTUDIO.")
        }
    },
    @{
        ref = "TEMAS"; audit = $true
        body = @(
            @{ name = "ITEMA"; type = "VARCHAR(255)"; pk = $true  },
            @{ name = "NTEMA"; type = "VARCHAR(255)"; pk = $false }
        )
        doc = @{ description = "Catalogo de temas transversales." }
    },
    @{
        ref = "CURSOS"; audit = $true; stack = $true
        body = @(
            @{ name = "ICURSO";              type = "VARCHAR(255)"; pk = $true  },
            @{ name = "NCURSO";              type = "VARCHAR(255)"; pk = $false },
            @{ name = "ITEMA";               type = "VARCHAR(255)"; pk = $false },
            @{ name = "DESCRIPCION";         type = "TEXT";         pk = $false },
            @{ name = "IDRIVER";             type = "BIGINT";       pk = $false },
            @{ name = "BACTIVO";             type = "BIT";          pk = $false; defaultValue = "1" },
            @{ name = "BGENERACERTIFICADO";  type = "BIT";          pk = $false; defaultValue = "0" }
        )
        doc = @{
            description = "Catalogo de cursos. Tabla central del modulo."
            rules = @("Master del dominio Cursos.", "stack:true emite HISTORIALCURSO.")
        }
    },
    @{
        ref = "PERMISOS"; audit = $false
        body = @(
            @{ name = "IPERMISO"; type = "VARCHAR(255)"; pk = $true  },
            @{ name = "NPERMISO"; type = "VARCHAR(255)"; pk = $false }
        )
        doc = @{
            description = "Catalogo global de permisos del sistema (sin prefijo)."
            rules = @("Vive bare bajo root: cualquier modulo lo referencia.")
        }
    },
    @{
        ref = "CURSOS_DE_PLANES_ESTUDIO"; audit = $true
        body = @(
            @{ name = "IPLANESTUDIO"; type = "VARCHAR(255)"; pk = $true  },
            @{ name = "ICURSO";       type = "VARCHAR(255)"; pk = $true  },
            @{ name = "QORDEN";       type = "INT";          pk = $false },
            @{ name = "BREQUERIDO";   type = "BIT";          pk = $false; defaultValue = "1" }
        )
        doc = @{
            description = "Pivote N:N entre planes de estudio y cursos."
            rules = @("PK compuesta (IPLANESTUDIO, ICURSO).")
        }
    },
    @{
        ref = "CURSOS_PREREQUISITOS"; audit = $false
        body = @(
            @{ name = "ICURSO";          type = "VARCHAR(255)"; pk = $true },
            @{ name = "ICURSOREQUERIDO"; type = "VARCHAR(255)"; pk = $true },
            @{ name = "IPLANESTUDIO";    type = "VARCHAR(255)"; pk = $true }
        )
        doc = @{
            description = "Grafo de prerequisitos entre cursos."
            rules = @("PK compuesta.", "Sin ciclos.", "Self-loops prohibidos.")
        }
    },
    @{
        ref = "ATRIBUTOS_X_DRIVERS"; audit = $false
        body = @(
            @{ name = "IDRIVER";    type = "BIGINT";       pk = $true  },
            @{ name = "IATRIBUTO";  type = "BIGINT";       pk = $true  },
            @{ name = "QNIVEL";     type = "TINYINT";      pk = $false },
            @{ name = "NATRIBUTO";  type = "VARCHAR(255)"; pk = $false },
            @{ name = "BREQUERIDO"; type = "BIT";          pk = $false; defaultValue = "0" },
            @{ name = "JCONFIG";    type = "VARCHAR(MAX)"; pk = $false },
            @{ name = "TDATRIBUTO"; type = "TINYINT";      pk = $false; defaultValue = "0" }
        )
        doc = @{
            description = "Pivote N:N entre atributos y drivers."
            rules = @("PK compuesta (IDRIVER, IATRIBUTO).")
        }
    },
    @{
        ref = "SEGURIDADES_CURSOS"; audit = $true
        body = @(
            @{ name = "ICURSO";   type = "VARCHAR(255)"; pk = $true  },
            @{ name = "IPERMISO"; type = "VARCHAR(255)"; pk = $true  },
            @{ name = "BACTIVO";  type = "BIT";          pk = $false; defaultValue = "1" }
        )
        doc = @{
            description = "Mapea permisos por curso."
            rules = @("PK compuesta (ICURSO, IPERMISO).", "BACTIVO controla soft-delete.")
        }
    },
    @{
        ref = "PLANES_CURSOS"; audit = $true
        body = @(
            @{ name = "IPLAN";       type = "VARCHAR(255)"; pk = $true  },
            @{ name = "ICURSO";      type = "VARCHAR(255)"; pk = $true  },
            @{ name = "TITULO";      type = "VARCHAR(255)"; pk = $false },
            @{ name = "ITEMA";       type = "VARCHAR(25)";  pk = $false },
            @{ name = "IRECURSO";    type = "VARCHAR(255)"; pk = $false },
            @{ name = "IPLANPADRE";  type = "VARCHAR(255)"; pk = $false },
            @{ name = "BACTIVO";     type = "BIT";          pk = $false; defaultValue = "1" }
        )
        doc = @{ description = "Catalogo de planes de cursos."; rules = @("BACTIVO controla visibilidad.") }
    },
    @{
        ref = "ATRIBUTOS_PLANES"; audit = $true
        body = @(
            @{ name = "IPLAN";     type = "VARCHAR(255)"; pk = $true  },
            @{ name = "ICURSO";    type = "VARCHAR(255)"; pk = $true  },
            @{ name = "IATRIBUTO"; type = "BIGINT";       pk = $true  },
            @{ name = "BACTIVO";   type = "BIT";          pk = $false; defaultValue = "1" },
            @{ name = "VALOR";     type = "VARCHAR(MAX)"; pk = $false }
        )
        doc = @{
            description = "Atributos extensibles asociados a planes (EAV light)."
            rules = @("PK compuesta (IPLAN, ICURSO, IATRIBUTO).")
        }
    },
    @{
        ref = "ESTRUCTURAS_CURSOS"; audit = $true
        body = @(
            @{ name = "ICURSO";  type = "VARCHAR(255)"; pk = $true  },
            @{ name = "QNIVEL";  type = "TINYINT";      pk = $true  },
            @{ name = "NNIVEL";  type = "VARCHAR(255)"; pk = $false },
            @{ name = "BACTIVO"; type = "BIT";          pk = $false; defaultValue = "1" }
        )
        doc = @{
            description = "Estructura jerarquica interna de un curso (modulos, lecciones)."
            rules = @("PK compuesta (ICURSO, QNIVEL).")
        }
    }
)

# ------------------------------------------------------------------
# Generar archivos columns/{TABLE}.json
# ------------------------------------------------------------------

# Limpia archivos existentes en columns/
Get-ChildItem -Path $colsDir -Filter "*.json" | Remove-Item -Force

function Build-ColObj {
    param($c)
    $obj = [ordered]@{
        name = $c.name
        type = $c.type
        primaryKey = [bool]$c.pk
    }
    if ($c.ContainsKey("nullable") -and $c.nullable) { $obj.nullable = $c.nullable }
    if ($c.ContainsKey("defaultValue") -and $c.defaultValue) { $obj.defaultValue = $c.defaultValue }
    return $obj
}

foreach ($t in $tables) {
    $children = New-Object System.Collections.ArrayList
    $idx = 0
    foreach ($c in $t.body) {
        $idx += 1
        [void]$children.Add([ordered]@{
            id = "$idx"
            kind = "col"
            obj = (Build-ColObj $c)
        })
    }
    if ($t.audit) {
        $idx += 1
        [void]$children.Add([ordered]@{
            id = "$idx"
            kind = "col"
            obj = [ordered]@{ name = "AUDITORIA"; primaryKey = $false; kind = "optional"; show = $true }
        })
        foreach ($c in $auditCols) {
            $idx += 1
            [void]$children.Add([ordered]@{
                id = "$idx"
                kind = "col"
                obj = (Build-ColObj $c)
            })
        }
    }
    $tree = [ordered]@{
        version = 3
        kind = "columns-tree"
        tableRef = $t.ref
        tableMeta = [ordered]@{ originalName = $t.ref; hasIfNotExists = $true }
        root = [ordered]@{
            id = ""
            kind = "root"
            children = $children
        }
    }
    if ($t.doc) { $tree.doc = $t.doc }
    $path = Join-Path $colsDir "$($t.ref).json"
    Write-JsonNoBom -Path $path -Object $tree
    Write-Host "wrote $path"
}

# ------------------------------------------------------------------
# tables-tree.json: prefix CAPAC_ con todas las tablas + PERMISOS bare
# ------------------------------------------------------------------

# Orden bajo CAPAC_: respetar SQL.
$capacOrder = @(
    "DRIVERS", "PLANES_ESTUDIO", "TEMAS", "CURSOS",
    "CURSOS_DE_PLANES_ESTUDIO", "CURSOS_PREREQUISITOS",
    "ATRIBUTOS_X_DRIVERS", "SEGURIDADES_CURSOS",
    "PLANES_CURSOS", "ATRIBUTOS_PLANES", "ESTRUCTURAS_CURSOS"
)
$tableMap = @{}
foreach ($t in $tables) { $tableMap[$t.ref] = $t }

$capacChildren = New-Object System.Collections.ArrayList
$ci = 0
foreach ($ref in $capacOrder) {
    $ci += 1
    $t = $tableMap[$ref]
    $obj = [ordered]@{ tableRef = $t.ref; rowName = $t.ref }
    if ($t.stack) { $obj.autoStack = $true; $obj.autoStackHistorial = $true }
    $node = [ordered]@{
        id = "1.$ci"
        kind = "table"
        obj = $obj
    }
    if ($t.doc) { $node.doc = $t.doc }
    [void]$capacChildren.Add($node)
}

$rootChildren = @(
    [ordered]@{
        id = "1"
        kind = "prefix"
        obj = [ordered]@{ rowName = "CAPAC_"; prefix = "CAPAC_" }
        wardenAction = [ordered]@{ idaction = "prefix" }
        children = $capacChildren
        doc = [ordered]@{
            description = "Prefijo del modulo de Capacitacion. Decora a sus descendientes con CAPAC_."
        }
    },
    [ordered]@{
        id = "2"
        kind = "table"
        obj = [ordered]@{ tableRef = "PERMISOS"; rowName = "PERMISOS" }
        doc = $tableMap["PERMISOS"].doc
    }
)

$treeDoc = [ordered]@{
    description = "Arbol de tablas del modulo de Capacitacion ClientesIS (CAPAC_)."
    rules = @(
        "Las tablas hoja persisten su arbol de columnas en columns/{tableRef}.json.",
        "El campo name de la tabla NUNCA incluye el prefijo; se aplica al emitir SQL via warden.",
        "Los id jerarquicos (ej. 1.2.3) son la fuente de verdad para findNodeById.",
        "Un nodo vigilante DEBE declarar wardenAction.idaction. Reservados: prefix.",
        "obj.autoStack=true marca la tabla como master de un dominio auto-stack.",
        "Los dominios funcionales viven en _state.json (domains map) hasta migrar a kind:domain inline.",
        "Convencion de nombres de columnas (validar siempre, sin excepciones):",
        "  - SOLO caracteres alfanumericos y mayuscula sostenida: ^[A-Z][A-Z0-9]*$.",
        "  - Prohibido cualquier separador (_, -, espacios, puntos, etc.).",
        "  - Prohibido iniciar con digito (representan variables en POJO).",
        "  - Aplica a TODA columna persistida y a las derivadas (HISTORIAL).",
        "Roles del modelo de tabla:",
        "  - master (auto-stack): el desarrollador define el master; los miembros se inyectan por algoritmo y NO pueden entrar/salir manualmente.",
        "  - slave: tabla normal que pertenece a un dominio funcional definido por el desarrollador.",
        "  - bare: tabla sin dominio ni prefijo (vive directo bajo root)."
    )
    entities = [ordered]@{
        root = [ordered]@{
            label = "Raiz del arbol"
            description = "Contenedor sintetico. No emite SQL."
            rules = @("Su id es vacio.", "Sus hijos definen el orden inicial.")
            objShape = [ordered]@{}
        }
        prefix = [ordered]@{
            label = "Prefijo SQL (vigilante)"
            description = "Agrupa tablas que comparten un prefijo SQL comun."
            rules = @(
                "obj.prefix debe terminar en _ y ser mayuscula.",
                "wardenAction.idaction debe ser prefix.",
                "Los hijos directos pueden ser otros prefix, domain o table."
            )
            objShape = [ordered]@{ rowName = "string"; prefix = "string" }
        }
        domain = [ordered]@{
            label = "Dominio funcional"
            description = "Agrupador conceptual master/slave. NO emite SQL."
            rules = @(
                "Define una tabla master y N esclavas.",
                "Roles soportados: 'user' (membresia editable) y 'auto-stack' (membresia derivada por algoritmo, sin entrada/salida manual).",
                "Cuando el master tiene obj.autoStack=true, el dominio es auto-stack y los miembros derivados no pueden eliminarse desde el editor."
            )
            objShape = [ordered]@{ domainId = "string"; masterTable = "string"; role = "'user' | 'auto-stack'" }
        }
        table = [ordered]@{
            label = "Tabla SQL"
            description = "Hoja del arbol. Su esquema vive en columns/{tableRef}.json."
            rules = @(
                "obj.tableRef y obj.rowName coinciden y NO incluyen el prefijo.",
                "Eliminar el nodo elimina tambien el archivo de columnas al guardar.",
                "obj.autoStack=true marca la tabla como master de un dominio auto-stack.",
                "obj.autoStackHistorial=false desactiva la inyeccion de la tabla virtual HISTORIAL en el auto-stack (default true).",
                "obj.stack es alias legado de obj.autoStack: lectura tolerada, escritura canonica usa autoStack."
            )
            objShape = [ordered]@{ tableRef = "string"; rowName = "string"; autoStack = "boolean?"; autoStackHistorial = "boolean?" }
        }
        col = [ordered]@{
            label = "Columna SQL"
            description = "Fila de un arbol de columnas."
            rules = @(
                "primaryKey:true participa en la PK; multiples forman PK compuesta.",
                "type debe estar en mayusculas.",
                "name debe cumplir ^[A-Z][A-Z0-9]*$ (mayusculas, sin separadores, no inicia en digito).",
                "Las columnas de auditoria (IUSUARIOCRE, FHCRE, IUSUARIOULT, FHULT, IAPPCRE, IPCRE, IAPPULT, IPULT) viven en seccion AUDITORIA y se autogeneran cuando Auditar esta activo.",
                "En tablas auto-stack, la PK del HISTORIAL es IHISTORIAL<MASTER> (sin separadores)."
            )
            objShape = [ordered]@{
                name = "string"; type = "string"; nullable = "string"
                primaryKey = "boolean"; defaultValue = "string"; extra = "string"
            }
        }
    }
}

$tree = [ordered]@{
    version = 3
    kind = "tables-tree"
    root = [ordered]@{
        id = ""
        kind = "root"
        children = $rootChildren
        doc = [ordered]@{
            description = "Punto de entrada del arbol de tablas CAPAC_."
            rules = @("Primero prefix CAPAC_, luego tablas bare como PERMISOS.")
        }
    }
    doc = $treeDoc
}

Write-JsonNoBom -Path $treeFile -Object $tree
Write-Host "wrote $treeFile"

# ------------------------------------------------------------------
# _state.json: dominios funcionales + ordenes
# ------------------------------------------------------------------

$targetFilePaths = @(
    "ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/02.Cursos/01.Modelo.ts",
    "ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/02.Cursos/02.Datos.ts",
    "ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/01.PlanDeEstudio.ts",
    "ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/130_UlTema.ts",
    "ISP-ClientesIS/src/sources/010 Objetos/6.ContaPymeU/2.Capacitacion/150_UlPermiso.ts",
    "ISP-ClientesIS/src/sources/020 Controllers/6.ContaPymeU/2.Capacitacion/UlCapacitacionClient.ts",
    "ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/01_PlanDeEstudio.ts",
    "ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/02_Cursos.ts",
    "ISW-ClientesIS/src/lib/ContaPymeU/2.Capacitacion/Cursos.ts",
    "ISW-ClientesIS/src/lib/ContaPymeU/2.Capacitacion/PlanDeEstudio.ts"
)

$domPlanes = "dom_capac_planes"
$domCursos = "dom_capac_cursos"
$domDrivers = "dom_capac_drivers"

$state = [ordered]@{
    targetFilePaths = $targetFilePaths
    domains = [ordered]@{
        $domDrivers = [ordered]@{
            id = $domDrivers
            name = "Drivers"
            masterTable = "CAPAC_DRIVERS"
            members = @("CAPAC_DRIVERS", "CAPAC_ATRIBUTOS_X_DRIVERS")
            parentPrefix = "CAPAC_"
            childrenOrder = @(
                @{ kind = "table"; key = "CAPAC_DRIVERS" },
                @{ kind = "table"; key = "CAPAC_ATRIBUTOS_X_DRIVERS" }
            )
        }
        $domPlanes = [ordered]@{
            id = $domPlanes
            name = "Planes Estudio"
            masterTable = "CAPAC_PLANES_ESTUDIO"
            members = @("CAPAC_PLANES_ESTUDIO", "CAPAC_CURSOS_DE_PLANES_ESTUDIO", "CAPAC_ATRIBUTOS_PLANES", "CAPAC_PLANES_CURSOS")
            parentPrefix = "CAPAC_"
            childrenOrder = @(
                @{ kind = "table"; key = "CAPAC_PLANES_ESTUDIO" },
                @{ kind = "table"; key = "CAPAC_CURSOS_DE_PLANES_ESTUDIO" },
                @{ kind = "table"; key = "CAPAC_ATRIBUTOS_PLANES" },
                @{ kind = "table"; key = "CAPAC_PLANES_CURSOS" }
            )
        }
        $domCursos = [ordered]@{
            id = $domCursos
            name = "Cursos"
            masterTable = "CAPAC_CURSOS"
            members = @("CAPAC_CURSOS", "CAPAC_CURSOS_PREREQUISITOS", "CAPAC_ESTRUCTURAS_CURSOS", "CAPAC_SEGURIDADES_CURSOS")
            parentPrefix = "CAPAC_"
            childrenOrder = @(
                @{ kind = "table"; key = "CAPAC_CURSOS" },
                @{ kind = "table"; key = "CAPAC_CURSOS_PREREQUISITOS" },
                @{ kind = "table"; key = "CAPAC_ESTRUCTURAS_CURSOS" },
                @{ kind = "table"; key = "CAPAC_SEGURIDADES_CURSOS" }
            )
        }
    }
    prefixOrders = [ordered]@{
        "CAPAC_" = @(
            @{ kind = "domain"; key = $domDrivers },
            @{ kind = "domain"; key = $domPlanes },
            @{ kind = "table";  key = "CAPAC_TEMAS" },
            @{ kind = "domain"; key = $domCursos }
        )
    }
    topOrder = @(
        @{ kind = "prefix"; key = "CAPAC_" },
        @{ kind = "table";  key = "PERMISOS" }
    )
    childPrefixes = [ordered]@{
        "" = @("CAPAC_")
    }
}

Write-JsonNoBom -Path $stateFile -Object $state
Write-Host "wrote $stateFile"

Write-Host "`nDone."
