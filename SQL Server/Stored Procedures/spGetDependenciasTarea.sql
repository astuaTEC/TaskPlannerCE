USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetDependenciasTarea(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombreTarea VARCHAR(50))
AS
SELECT	nombreTareaDependiente as nombreTarea
FROM	TAREA_DEPENDENCIA as TD
WHERE	TD.correoEstudiante = @correo AND
		TD.nombreTablero = @nombreTablero AND
		nombreTarea = @nombreTarea;
GO

EXEC	spGetDependenciasTarea @correo = 'sam.astua@estudiantec.cr', @nombreTablero = 'Tablero 1',
		@nombreTarea = 'Tarea 1';



