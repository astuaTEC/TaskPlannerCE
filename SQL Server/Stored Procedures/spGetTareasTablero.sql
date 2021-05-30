USE TaskPlannerCEDB
GO

ALTER PROCEDURE spGetTareasTablero(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50))
AS
SELECT	E.nombre as nombreEstado, T.fechaInicio, T.fechaFinalizacion
FROM	(SELECT nombre, correoEstudiante, nombreTablero
		FROM ESTADO
		WHERE	@correo = correoEstudiante AND
				@nombreTablero = nombreTablero) AS E
LEFT JOIN 
TAREA AS T
ON	E.correoEstudiante = T.correoEstudiante AND
	E.nombreTablero = T.nombreTablero AND
	E.nombre = T.nombreEstado

EXEC spGetTareasTablero @correo = 'sam.astua@estudiantec.cr', @nombreTablero = 'Tablero 1';