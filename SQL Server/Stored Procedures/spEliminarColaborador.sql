USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarColaborador(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@correoC VARCHAR(50))
AS
DELETE	ESTUDIANTE_TABLERO
WHERE	@correo = correoEstudiante AND
		@nombreTablero = nombreTablero AND
		@correoC = correoColaborador;

GO

EXEC	spEliminarColaborador @correo = 'kevinar51@estudiantec.cr', @nombreTablero = 'Maluma 2021', @correoC = '';