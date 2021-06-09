USE TaskPlannerCEDB;
GO

CREATE TRIGGER eliminarTareaTrigger
ON TAREA
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;
		
		-- se eliminan las dependencias
		DELETE	TAREA_DEPENDENCIA
		WHERE	correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
				nombreTablero IN (SELECT nombreTablero FROM deleted) AND
				nombreTareaDependiente IN (SELECT nombre FROM deleted);

		-- se eliminan los responsables de la tarea
		DELETE	TAREA_ESTUDIANTE
		WHERE	correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
				nombreTablero IN (SELECT nombreTablero FROM deleted)AND
				nombreTarea IN (SELECT nombre FROM deleted);

		-- Se elimina finalmente la tarea
		DELETE	TAREA
		WHERE	correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
				nombreTablero IN (SELECT nombreTablero FROM deleted) AND
				nombre IN (SELECT nombre FROM deleted);
END