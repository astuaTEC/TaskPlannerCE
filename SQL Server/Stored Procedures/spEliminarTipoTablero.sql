USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarTipoTablero(
@nombre VARCHAR(50))
AS
DELETE	TIPO_TABLERO
WHERE	@nombre = nombre;

GO