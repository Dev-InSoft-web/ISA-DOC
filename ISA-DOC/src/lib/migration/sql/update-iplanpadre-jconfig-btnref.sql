-- Capacitación · Convertir `iplanpadre` (IATRIBUTO = 5) de `text` a `btnref`
-- Aplica a los drivers 1, 2 y 3 en `CAPAC_ATRIBUTOS_X_DRIVERS`.
--
-- Motivación: al editar el atributo `iplanpadre` (plan padre del contenido)
-- el usuario no debe escribir libremente. Debe abrirse un BtnRef que liste
-- los hermanos del capítulo actual. El filtrado por hermanos lo aplica un
-- controlador definido en código (ISW), pero la JCONFIG indica al renderer
-- (`Attr2Input` vía `jconfig2FieldDef`) qué `type` usar y a qué controlador
-- referenciar mediante `controllername`.
--
-- JCONFIG nuevo (IATRIBUTO = 5):
--   {
--     "type": "btnref",
--     "controllername": "iplanpadre",
--     "descripcion": "Plan padre del contenido. Lista los hermanos del capítulo actual.",
--     "inputProps": { "maxlength": 500 }
--   }
--
-- Idempotente: solo SET sobre filas existentes. Filtra por IDRIVER IN (1,2,3)
-- e IATRIBUTO = 5. Termina con SELECT de verificación.

SET NOCOUNT ON;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"btnref","controllername":"iplanpadre","descripcion":"Plan padre del contenido. Lista los hermanos del capítulo actual.","inputProps":{"maxlength":500}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 5;

SELECT IDRIVER, IATRIBUTO, NATRIBUTO, JCONFIG
FROM CAPAC_ATRIBUTOS_X_DRIVERS
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 5
ORDER BY IDRIVER, IATRIBUTO;
