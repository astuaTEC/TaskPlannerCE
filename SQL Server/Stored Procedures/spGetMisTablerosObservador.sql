USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetMisTablerosObservador(
@correo VARCHAR(50))
AS
SELECT T.nombre, T.tipo, T.descripcion, T.correoEstudiante AS correoPropietario
FROM TABLERO AS T,  TABLERO_PROFESOR AS TP
WHERE	TP.correoProfesor = @correo AND
		TP.correoEstudiante = T.correoEstudiante AND
		TP.nombreTablero = T.nombre;

GO

EXEC spGetMisTablerosObservador @correo = 'alfredo@profextec.cr';