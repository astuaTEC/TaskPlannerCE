USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetTodosEstudiantes(
@correo VARCHAR(50))
AS
SELECT	(primerNombre + ' ' + segundoNombre + ' ' + primerApellido + ' ' + segundoApellido) AS nombre,
		correoInstitucional 
FROM	ESTUDIANTE
WHERE	NOT @correo = correoInstitucional

GO

EXEC spGetTodosEstudiantes @correo = 'kevinar51@estudiantec.cr';