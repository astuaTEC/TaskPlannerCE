USE TaskPlannerCE;
GO

CREATE PROCEDURE spActualizarNombreEstado(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombre VARCHAR(50),
@estado INT)
AS
UPDATE	ESTADO
SET		nombre = @nombre
WHERE	correoEstudiante = @correo AND
		nombreTablero = @nombreTablero AND
		Id = @estado;
GO

EXEC spActualizarNombreEstado @correo = 'sam.astua@estudiantec.cr', @nombreTablero = 'Tablero 1',
							@nombre = 'Estado A', @estado = 1;