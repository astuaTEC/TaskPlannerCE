USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetTablero(
@correo VARCHAR(50),
@nombre VARCHAR(50))
AS
SELECT nombre, tipo, descripcion, correoEstudiante AS correoPropietario
FROM TABLERO 
WHERE	correoEstudiante = @correo AND
		nombre = @nombre;

GO

EXEC spGetTablero @correo = 'kevinar51@estudiantec.cr', @nombre = 'Maluma 2021';