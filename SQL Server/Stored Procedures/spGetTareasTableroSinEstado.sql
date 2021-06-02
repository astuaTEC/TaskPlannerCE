USE TaskPlannerCEDB
GO

ALTER PROCEDURE spGetTareasTableroSinEstado(
@correo VARCHAR(50),
@nombre VARCHAR(50),
@nombreTarea VARCHAR(50))
AS
SELECT	nombre as nombreTarea
FROM	TAREA 
WHERE	correoEstudiante =  @correo AND
		nombreTablero = @nombre AND
		nombre != @nombreTarea;

EXEC spGetTareasTableroSinEstado @correo = 'sam.astua@estudiantec.cr', @nombre = 'Tablero 1', @nombreTarea = 'Tarea 1';