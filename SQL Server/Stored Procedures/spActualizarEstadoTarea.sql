USE TaskPlannerCE;
GO

ALTER PROCEDURE spActualizarEstadoTarea(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombre VARCHAR(50),
@estado INT)
AS
UPDATE	TAREA
SET		IdEstado = @estado
WHERE	correoEstudiante = @correo AND
		nombreTablero = @nombreTablero AND
		nombre = @nombre;
GO

EXEC spActualizarEstadoTarea @correo = 'sam.astua@estudiantec.cr', @nombreTablero = 'Tablero 1',
							@nombre = 'Tarea 1', @estado = 1;