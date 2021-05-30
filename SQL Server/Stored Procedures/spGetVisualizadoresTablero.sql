USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetVisualizadoresTablero(
@correo VARCHAR(50),
@nombre VARCHAR(50))
AS
SELECT	(P.primerNombre + ' ' + P.primerApellido) AS nombre,
		P.correoInstitucional
FROM	PROFESOR AS P, TABLERO_PROFESOR AS TP 
WHERE	TP.correoEstudiante = @correo AND
		TP.correoProfesor = P.correoInstitucional;

GO

EXEC spGetVisualizadoresTablero @correo = 'kevinar51@estudiantec.cr', @nombre = 'Maluma 2021';