USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarUsuario(
@correo VARCHAR(50))
AS
DELETE	ESTUDIANTE
WHERE	@correo = correoInstitucional;

GO

exec spEliminarUsuario @correo = 'sam.astua@estudiantec.cr';