USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetmisTableros(
@miCorreo VARCHAR(50))
AS
SELECT nombre, tipo, descripcion, correoEstudiante AS correoPropietario
FROM TABLERO 
WHERE correoEstudiante = @miCorreo;

GO

EXEC spGetmisTableros @miCorreo = 'sam.astua@estudiantec.cr';