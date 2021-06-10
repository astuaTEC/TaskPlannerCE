USE TaskPlannerCEDB;
GO

CREATE TRIGGER eliminarTableroTrigger
ON TABLERO
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;

		-- se eliminan los colaboradores
		DELETE	ESTUDIANTE_TABLERO
		WHERE	correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
				nombreTablero IN (SELECT nombre FROM deleted);

		-- se eliminan los visualizadores
		DELETE	TABLERO_PROFESOR
		WHERE	correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
				nombreTablero IN (SELECT nombre FROM deleted);

		-- Se eliminan los Estados
		DELETE	ESTADO
		WHERE	correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
				nombreTablero IN (SELECT nombre FROM deleted);

		-- se elimina finalmente el Tablero
		DELETE	TABLERO
		WHERE	correoEstudiante IN (SELECT correoEstudiante FROM deleted) AND
				nombre IN (SELECT nombre FROM deleted);

END