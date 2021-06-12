USE TaskPlannerCEDB;

GO


CREATE PROCEDURE spGetTareasCPM(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50))
AS
SELECT	t.nombre, t.fechaInicio, t.fechaFinalizacion, td.nombreTareaDependiente as dependencia
FROM	TAREA as t, TAREA_DEPENDENCIA AS td
WHERE	t.correoEstudiante = @correo AND
		t.nombreTablero = @nombreTablero AND
		t.correoEstudiante = td.correoEstudiante AND
		t.nombreTablero = td.nombreTablero AND
		t.nombre = td.nombreTarea;
GO

EXEC spGetTareasCPM @correo = 'sam.astua@estudiantec.cr', @nombreTablero = 'Tablero 1';