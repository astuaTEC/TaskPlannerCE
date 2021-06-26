USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarProfesor(
@correo VARCHAR(50))
AS
DELETE	PROFESOR
WHERE	@correo = correoInstitucional;

GO