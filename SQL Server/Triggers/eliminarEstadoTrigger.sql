USE TaskPlannerCEDB;
GO

CREATE TRIGGER eliminarEstadoTrigger
ON ESTADO
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;
	
	-- Se eliminan las tareas
	DELETE	TAREA
	WHERE	correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
			nombreTablero IN (SELECT nombreTablero FROM deleted) AND
			IdEstado IN (SELECT Id FROM deleted);

	-- se elimina finalmente el estado
	DELETE	ESTADO
	WHERE	Id IN (SELECT Id FROM deleted) AND
			correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
			nombreTablero IN (SELECT nombreTablero FROM deleted);

END