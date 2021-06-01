USE TaskPlannerCEDB
GO

ALTER PROCEDURE spGetEstudiantesNoAmigos(
@miCorreo VARCHAR(50))
AS
SELECT	E.correoInstitucional, E.carnet, 
		(E.primerNombre + ' ' + E.segundoNombre + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre
FROM	ESTUDIANTE AS E
WHERE	NOT @miCorreo = E.correoInstitucional AND
		NOT EXISTS	(SELECT	EA.correoAmigo AS correoInstitucional, E.carnet, 
					(E.primerNombre + ' ' + E.segundoNombre + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre
					FROM	ESTUDIANTE_AMIGO AS EA, ESTUDIANTE AS E
					WHERE	EA.correoEstudiante = @miCorreo AND
							E.correoInstitucional = EA.correoAmigo);

GO 

EXEC spGetEstudiantesNoAmigos @miCorreo = 'sam.astua@estudiantec.cr';