-- Capacitación · JCONFIG v2 (nomenclatura igual a nombres de componente)
-- Aplica a los drivers 1, 2 y 3 en `CAPAC_ATRIBUTOS_X_DRIVERS`, los 6
-- atributos compartidos (IATRIBUTO 1..6).
--
-- Cambios respecto a la versión del 2026-05-06:
--   - Renombra los `type` para que coincidan exactamente con el nombre del
--     componente Svelte que los renderiza:
--       text       -> InputText
--       number     -> InputNumber
--       switch     -> Switch
--       richeditor -> RichEditor
--       selectEnum -> SelectObject
--       btnref     -> BtnRef
--       catalogo   -> CatalogoGen
--   - `iplanpadre` (IATRIBUTO = 5) pasa de `InputText` readonly a `BtnRef`
--     con `controllername: "iplanpadre"`. El controlador (definido en
--     código ISW) filtra los hermanos del capítulo actual.
--
-- Idempotente: solo SET sobre filas existentes filtradas por IDRIVER IN (1,2,3).
-- Termina con SELECT de verificación.

SET NOCOUNT ON;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"InputText","descripcion":"URL pública de las diapositivas asociadas al recurso.","inputProps":{"placeholder":"https://...","maxlength":500}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 1;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"InputText","descripcion":"URL pública de la imagen del profesor.","inputProps":{"placeholder":"https://...","maxlength":500}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 2;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"SelectObject","options":{"1":"Lista con imagen pequeña","2":"Tarjeta con información completa","3":"Tarjeta solo con título","4":"Lista con imagen grande","5":"Lista pequeño"},"descripcion":"Componente Svelte que procesa los datos del video. Lista quemada (TTDriverRecurso); se actualizará cuando se aprueben otros controladores."}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 3;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"SelectObject","options":{"B":"Básico","M":"Medio","A":"Avanzado"},"descripcion":"Nivel de dificultad del contenido."}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 4;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"BtnRef","controllername":"iplanpadre","descripcion":"Plan padre del contenido. Lista los hermanos del capítulo actual.","inputProps":{"maxlength":500}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 5;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"InputText","descripcion":"URL pública del documento adjunto al plan.","inputProps":{"placeholder":"https://...","maxlength":500}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 6;

SELECT IDRIVER, IATRIBUTO, NATRIBUTO, JCONFIG
FROM CAPAC_ATRIBUTOS_X_DRIVERS
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO BETWEEN 1 AND 6
ORDER BY IDRIVER, IATRIBUTO;
