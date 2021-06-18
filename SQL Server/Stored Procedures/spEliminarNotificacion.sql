USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarNotificacion(
@correo VARCHAR(50),
@Id INT)
AS
DELETE	NOTIFICACION
WHERE	correoEstudiante = @correo AND
		Id = @Id;

GO