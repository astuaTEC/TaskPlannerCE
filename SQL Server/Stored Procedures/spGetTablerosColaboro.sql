USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetTablerosColaboro(
@miCorreo VARCHAR(50))
AS
SELECT T.nombre, T.tipo, T.descripcion, T.correoEstudiante AS correoPropietario
FROM TABLERO AS T, ESTUDIANTE_TABLERO AS ET 
WHERE	ET.correoColaborador = @miCorreo AND
		ET.correoEstudiante = T.correoEstudiante AND
		ET.nombreTablero = t.nombre;

GO

EXEC spGetTablerosColaboro @miCorreo = 'sam.astua@estudiantec.cr';