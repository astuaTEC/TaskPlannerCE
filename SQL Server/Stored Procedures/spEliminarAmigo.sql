USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spEliminarAmigo(
@correo VARCHAR(50),
@correoA VARCHAR(50))
AS
DELETE	ESTUDIANTE_AMIGO
WHERE	(@correo = correoEstudiante AND
		@correoA = correoAmigo);

GO

EXEC spEliminarAmigo @correo = 'sam.astua@estudiantec.cr', @correoA = 'ejemplo@estudiantec.cr';