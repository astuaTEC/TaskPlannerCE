USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spEliminarTarea(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombre VARCHAR(50))
AS
DELETE	TAREA
WHERE	@correo = correoEstudiante AND
		@nombreTablero = nombreTablero AND
		@nombre = nombre;

GO