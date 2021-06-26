USE TaskPlannerCEDB
GO

ALTER PROCEDURE spGetEstudiantesNoAmigos(
@miCorreo VARCHAR(50))
AS
SELECT	E.correoInstitucional, E.carnet, 
		(E.primerNombre + ' ' + E.segundoNombre + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre
FROM	ESTUDIANTE AS E
WHERE	@miCorreo != E.correoInstitucional AND
		E.correoInstitucional NOT IN (	SELECT	EA.correoAmigo AS correoInstitucional
										FROM	ESTUDIANTE_AMIGO AS EA, ESTUDIANTE AS E
										WHERE	EA.correoEstudiante = @miCorreo AND
										E.correoInstitucional = EA.correoAmigo);

GO 

EXEC spGetEstudiantesNoAmigos @miCorreo = 'sam.astua@estudiantec.cr';