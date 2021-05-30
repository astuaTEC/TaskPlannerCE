USE TaskPlannerCEDB
GO

CREATE PROCEDURE spGetAmigos(
@miCorreo VARCHAR(50))
AS
SELECT	EA.correoAmigo, E.carnet, 
		(E.primerNombre + ' ' + E.segundoNombre + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre
FROM	ESTUDIANTE_AMIGO AS EA, ESTUDIANTE AS E
WHERE	EA.correoEstudiante = @miCorreo AND
		E.correoInstitucional = EA.correoAmigo;

GO 

EXEC spGetAmigos @miCorreo = 'sam.astua@estudiantec.cr';