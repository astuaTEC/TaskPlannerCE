USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetNumeroDeTableros(
@correo VARCHAR(50))
AS
SELECT	COUNT(*) as numero
FROM	TABLERO
WHERE	correoEstudiante = @correo
GROUP BY correoEstudiante;

GO

EXEC spGetNumeroDeTableros @correo = 'sam.astua@estudiantec.cr';