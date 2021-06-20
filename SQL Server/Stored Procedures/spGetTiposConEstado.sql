USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetTiposConEstado
AS
SELECT nombreTipo, nombreEstado
FROM TIPO_TABLERO_ESTADO
ORDER BY nombreTipo, nombreEstado ASC;

GO

EXEC spGetTiposConEstado;