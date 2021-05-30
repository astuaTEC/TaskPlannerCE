USE TaskPlannerCEDB
GO

Alter PROCEDURE spBuscarEstudiantes(
@miCorreo VARCHAR(50),
@variable VARCHAR(50))
AS
SELECT	E.correoInstitucional, E.carnet, 
		(E.primerNombre + ' ' + E.segundoNombre + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre
FROM	ESTUDIANTE AS E
WHERE	(E.correoInstitucional = @variable OR
		E.primerNombre = @variable OR
		E.segundoNombre = @variable)
		AND NOT E.correoInstitucional = @miCorreo;

GO 

EXEC spBuscarEstudiantes @miCorreo = 'sam.astua@estudiantec.cr', @variable = 'kevinar51@estudiantec.cr'