USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetTodosProfes
AS
SELECT	(primerNombre + ' ' + segundoNombre + ' ' + primerApellido + ' ' + segundoApellido) AS nombre, 
		correoInstitucional
FROM PROFESOR;

GO

EXEC spGetTodosProfes;