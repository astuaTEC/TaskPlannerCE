USE TaskPlannerCEDB;
GO

CREATE TRIGGER eliminarAmigoTrigger
ON ESTUDIANTE_AMIGO
AFTER DELETE
AS
BEGIN
	SET NOCOUNT ON;

		DECLARE @correoE VARCHAR(50),
				@correoA VARCHAR(50);

		SET @correoE = (SELECT correoEstudiante from deleted);
		SET @correoA = (SELECT correoAmigo from deleted);
		
		DELETE	ESTUDIANTE_TABLERO
		WHERE	(@correoE = correoEstudiante AND
				@correoA = correoColaborador) OR
				(@correoA = correoEstudiante AND
				@correoE = correoColaborador);

		DELETE	ESTUDIANTE_AMIGO
		WHERE	(@correoA = correoEstudiante AND
				@correoE = correoAmigo); 
END