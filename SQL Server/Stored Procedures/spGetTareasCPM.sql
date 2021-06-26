USE TaskPlannerCEDB;

GO


ALTER PROCEDURE spGetTareasCPM(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50))
AS
SELECT	t.nombre, t.fechaInicio, t.fechaFinalizacion, td.nombreTareaDependiente as dependencia
FROM	TAREA as t 
LEFT JOIN TAREA_DEPENDENCIA AS td
ON		t.correoEstudiante = td.correoEstudiante AND
		t.nombreTablero = td.nombreTablero AND
		t.nombre = td.nombreTarea
WHERE	t.correoEstudiante = @correo AND
		t.nombreTablero = @nombreTablero;

GO

EXEC spGetTareasCPM @correo = 'kevinar51@estudiantec.cr', @nombreTablero = 'Jicaral Hasta la Muerte';