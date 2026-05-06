-- Capacitación · Completar JCONFIG en CAPAC_ATRIBUTOS_X_DRIVERS
-- Aplica a los drivers 1, 2 y 3 (los únicos existentes), que comparten los
-- mismos 6 atributos (IATRIBUTO 1..6).
--
-- Mapeo IATRIBUTO -> NATRIBUTO -> JCONFIG:
--   1  URL diapositivas    -> text + URL placeholder
--   2  Imagen del profesor -> text + URL placeholder
--   3  Driver de video     -> text + placeholder driver/URL
--   4  Dificultad          -> selectEnum {B,M,A}
--   5  iplanpadre          -> text readonly (auto desde árbol)
--   6  Documento           -> text + URL placeholder
--
-- Idempotente: solo SET sobre filas existentes. Filtra por IDRIVER IN (1,2,3)
-- para no afectar drivers que se creen en el futuro con semánticas distintas.

SET NOCOUNT ON;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"text","descripcion":"URL pública de las diapositivas asociadas al recurso.","inputProps":{"placeholder":"https://...","maxlength":500}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 1;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"text","descripcion":"URL pública de la imagen del profesor.","inputProps":{"placeholder":"https://...","maxlength":500}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 2;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"text","descripcion":"Identificador o URL del driver de video.","inputProps":{"placeholder":"youtube | vimeo | https://...","maxlength":255}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 3;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"selectEnum","options":{"B":"Básico","M":"Medio","A":"Avanzado"},"descripcion":"Nivel de dificultad del contenido."}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 4;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"text","readonly":true,"descripcion":"Path del plan padre. Calculado automáticamente desde el árbol de contenidos."}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 5;

UPDATE CAPAC_ATRIBUTOS_X_DRIVERS
SET JCONFIG = '{"type":"text","descripcion":"URL pública del documento adjunto al plan.","inputProps":{"placeholder":"https://...","maxlength":500}}'
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 6;

SELECT IDRIVER, IATRIBUTO, NATRIBUTO, JCONFIG
FROM CAPAC_ATRIBUTOS_X_DRIVERS
WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO BETWEEN 1 AND 6
ORDER BY IDRIVER, IATRIBUTO;
