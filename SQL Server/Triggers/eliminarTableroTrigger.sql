USE TaskPlannerCEDB;
GO

create TRIGGER eliminarTableroTrigger
ON TABLERO
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;

		DECLARE @correo VARCHAR(50),
				@nombre VARCHAR(50);

		SET @correo = (SELECT correoEstudiante FROM deleted);
		SET @nombre = (SELECT nombre FROM deleted);

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