USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetDependenciasTarea(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombreTarea VARCHAR(50),
@estado VARCHAR(50))
AS
SELECT	nombreEstado, nombreTareaDependiente as nombreTarea
FROM	TAREA_DEPENDENCIA
WHERE	correoEstudiante = @correo AND
		nombreTablero = @nombreTablero AND
		nombreTarea = @nombreTarea AND
		nombreEstado = @estado;

GO

EXEC	spGetDependenciasTarea @correo = 'sam.astua@estudiantec.cr', @nombreTablero = 'Tablero 1',
		@nombreTarea = 'Tarea 1', @estado = 'Estado A';



