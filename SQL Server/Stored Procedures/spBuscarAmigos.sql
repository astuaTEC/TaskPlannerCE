USE TaskPlannerCEDB
GO

CREATE PROCEDURE spBuscarAmigos(
@miCorreo VARCHAR(50),
@variable VARCHAR(50))
AS
SELECT	EA.correoAmigo, E.carnet, 
		(E.primerNombre + ' ' + E.segundoNombre + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre
FROM	ESTUDIANTE_AMIGO AS EA, ESTUDIANTE AS E
WHERE	(EA.correoAmigo = @variable OR
		E.primerNombre = @variable OR
		E.segundoNombre = @variable) AND
		EA.correoEstudiante = @miCorreo AND
		E.correoInstitucional = EA.correoAmigo;

GO 

EXEC spBuscarAmigos @miCorreo = 'sam.astua@estudiantec.cr', @variable = 'kevinar51@estudiantec.cr'