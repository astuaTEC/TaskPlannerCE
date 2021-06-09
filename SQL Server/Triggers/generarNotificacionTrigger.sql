USE TaskPlannerCEDB;
GO

CREATE TRIGGER generarNotificacionTrigger
ON SOLICITUD
AFTER UPDATE
AS
BEGIN
	SET NOCOUNT ON;

		DECLARE @correoE VARCHAR(50),
				@correoR VARCHAR(50),
				@estado VARCHAR(15);

		SET @correoE = (SELECT correoEmisor from inserted);
		SET @correoR = (SELECT correoReceptor from inserted);
		SET @estado = (SELECT estado from inserted);

		IF(@estado = 'Aceptado')
		BEGIN
			INSERT INTO NOTIFICACION(correoEstudiante, descripcion, fecha)
			VALUES	(@correoE, @correoR + ' ha aceptado tu solicitud de amistad', GETDATE());

			INSERT INTO ESTUDIANTE_AMIGO(correoEstudiante, correoAmigo, fecha)
			VALUES	(@correoE, @correoR, GETDATE()),
					(@correoR, @correoE, GETDATE());

			-- se eliminan solicitudes en ambos sentidos
			DELETE SOLICITUD
			WHERE	(correoEmisor = @correoE AND
					correoReceptor = @correoR) OR
					(correoEmisor = @correoR AND
					correoReceptor = @correoE);
		END
		
		ELSE IF(@estado = 'Rechazado')
		BEGIN
			INSERT INTO NOTIFICACION(correoEstudiante, descripcion, fecha)
			VALUES	(@correoE, @correoR + ' ha rechazado tu solicitud de amistad', GETDATE());

			-- se elimina la silicitud rechazada
			DELETE SOLICITUD
			WHERE	(correoEmisor = @correoE AND
					correoReceptor = @correoR);
		END

END