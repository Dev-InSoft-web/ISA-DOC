/*
  Actualiza NATRIBUTO en CAPAC_ATRIBUTOS_X_DRIVERS a etiquetas legibles para UI.
  Idempotente: puede ejecutarse varias veces.

  Valores en kebab o mayúsculas → etiquetas de presentación (español, acentos, capitalizado).
  Nota: la migración CAPAC_PLANDECURSO_OLD → CAPAC_PLANES_CURSOS vuelve a MERGE atributos desde
  doc/migrar-tbls-bdd/src/hierarchy-indices-sql.js; ahí deben figurar ya las etiquetas finales.

  Ejecutar en la base donde viva la capacitación (p. ej. CLIENTES).
*/
USE CLIENTES;
GO

IF OBJECT_ID(N'dbo.CAPAC_ATRIBUTOS_X_DRIVERS', N'U') IS NOT NULL
BEGIN
  /* Textos antiguos (mayúsculas / espacios) */
  UPDATE dbo.CAPAC_ATRIBUTOS_X_DRIVERS
  SET NATRIBUTO = CASE UPPER(LTRIM(RTRIM(NATRIBUTO)))
    WHEN N'URL DIAPOSITIVAS' THEN N'URL diapositivas'
    WHEN N'IMAGEN DEL PROFESOR' THEN N'Imagen del profesor'
    WHEN N'DRIVER DE VÍDEO' THEN N'Driver de vídeo'
    WHEN N'DRIVER DE VIDEO' THEN N'Driver de vídeo'
    WHEN N'DIFICULTAD' THEN N'Dificultad'
    ELSE NATRIBUTO
  END
  WHERE UPPER(LTRIM(RTRIM(NATRIBUTO))) IN (
    N'URL DIAPOSITIVAS', N'IMAGEN DEL PROFESOR', N'DRIVER DE VÍDEO', N'DRIVER DE VIDEO', N'DIFICULTAD'
  );

  /* Valores kebab-case (como en captura de pantalla) */
  UPDATE dbo.CAPAC_ATRIBUTOS_X_DRIVERS
  SET NATRIBUTO = CASE LOWER(LTRIM(RTRIM(NATRIBUTO)))
    WHEN N'url-diapositivas' THEN N'URL diapositivas'
    WHEN N'imagen-del-profesor' THEN N'Imagen del profesor'
    WHEN N'driver-de-video' THEN N'Driver de vídeo'
    WHEN N'dificultad' THEN N'Dificultad'
    ELSE NATRIBUTO
  END
  WHERE LOWER(LTRIM(RTRIM(NATRIBUTO))) IN (
    N'url-diapositivas', N'imagen-del-profesor', N'driver-de-video', N'dificultad'
  );
END;
GO
