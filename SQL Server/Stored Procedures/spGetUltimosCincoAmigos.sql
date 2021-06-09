USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetUltimosCincoAmigos(
@correo VARCHAR(50))
AS
SELECT	TOP (5) fecha, correoAmigo
FROM	ESTUDIANTE_AMIGO 
WHERE	correoEstudiante = @correo
ORDER BY fecha DESC;

GO

EXEC spGetUltimosCincoAmigos @correo = 'sam.astua@estudiantec.cr';