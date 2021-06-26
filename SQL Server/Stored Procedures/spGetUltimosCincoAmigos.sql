USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetUltimosCincoAmigos(
@correo VARCHAR(50))
AS
SELECT	TOP (5) fecha, correoAmigo, E.carreraMatriculada as carrera, 
		(E.primerNombre + ' ' + E.segundoNombre + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre
FROM	ESTUDIANTE_AMIGO as EA, ESTUDIANTE as E 
WHERE	EA.correoEstudiante = @correo AND
		EA.correoAmigo = E.correoInstitucional
ORDER BY fecha DESC;

GO

EXEC spGetUltimosCincoAmigos @correo = 'sam.astua@estudiantec.cr';