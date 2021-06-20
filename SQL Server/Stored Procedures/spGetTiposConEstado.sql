USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetTiposConEstado
AS
SELECT TT.nombre as nombreTipo, ISNULL(nombreEstado, '') as nombreEstado
FROM TIPO_TABLERO_ESTADO AS TTE
RIGHT JOIN TIPO_TABLERO AS TT
ON TT.nombre = TTE.nombreTipo
ORDER BY nombreTipo, nombreEstado;

GO

EXEC spGetTiposConEstado;