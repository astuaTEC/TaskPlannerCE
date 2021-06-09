USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarEstado(
@id INT,
@correo VARCHAR(50),
@nombreTablero VARCHAR(50))
AS
DELETE	ESTADO
WHERE	@id = Id AND
		@correo = correoEstudiante AND
		@nombreTablero = nombreTablero;

GO