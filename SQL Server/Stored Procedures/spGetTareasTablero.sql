USE TaskPlannerCEDB
GO

ALTER PROCEDURE spGetTareasTablero(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50))
AS
SELECT	E.nombre as nombreEstado, T.nombre as nombreTarea, T.fechaInicio, 
		T.fechaFinalizacion, T.descripcion, E.idEstado
FROM	(SELECT nombre, correoEstudiante, nombreTablero, Id as idEstado
		FROM ESTADO
		WHERE	@correo = correoEstudiante AND
				@nombreTablero = nombreTablero) AS E
LEFT JOIN 
TAREA AS T
ON	E.correoEstudiante = T.correoEstudiante AND
	E.nombreTablero = T.nombreTablero AND
	E.idEstado = T.IdEstado
GO

EXEC spGetTareasTablero @correo = 'sam.astua@estudiantec.cr', @nombreTablero = 'Tablero 1';