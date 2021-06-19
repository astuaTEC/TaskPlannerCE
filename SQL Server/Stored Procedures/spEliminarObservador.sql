USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarObservador(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@correoO VARCHAR(50))
AS
DELETE	TABLERO_PROFESOR
WHERE	@correo = correoEstudiante AND
		@nombreTablero = nombreTablero AND
		@correoO = correoProfesor;

GO