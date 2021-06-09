USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarTablero(
@correo VARCHAR(50),
@nombre VARCHAR(50))
AS
DELETE	TABLERO
WHERE	@correo = correoEstudiante AND
		@nombre = nombre;

GO

EXEC spEliminarTablero @correo = 'kevinar51@estudiantec.cr', @nombre = 'Maluma 2021';