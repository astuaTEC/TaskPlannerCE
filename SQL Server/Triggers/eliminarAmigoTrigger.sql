USE TaskPlannerCEDB;
GO

ALTER TRIGGER eliminarAmigoTrigger
ON ESTUDIANTE_AMIGO
AFTER DELETE
AS
BEGIN
	SET NOCOUNT ON;
		
		DELETE	ESTUDIANTE_TABLERO
		WHERE	(correoEstudiante IN (SELECT correoEstudiante from deleted) AND
				correoColaborador IN (SELECT correoAmigo from deleted)) OR
				(correoEstudiante IN (SELECT correoAmigo from deleted) AND
				correoColaborador IN (SELECT correoEstudiante from deleted));

		DELETE	ESTUDIANTE_AMIGO
		WHERE	(correoEstudiante IN (SELECT correoEstudiante from deleted) AND
				correoAmigo IN (SELECT correoAmigo from deleted)) OR
				(correoAmigo IN (SELECT correoEstudiante from deleted) AND
				correoEstudiante IN (SELECT correoAmigo from deleted)); 
END