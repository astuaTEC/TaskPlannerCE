USE TaskPlannerCEDB;
GO

alter TRIGGER eliminarUsuarioTrigger
ON ESTUDIANTE
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;

		-- se eliminan las tareas en donde era responsable
		DELETE	TAREA_ESTUDIANTE
		WHERE	correoResponsable IN (SELECT correoInstitucional FROM deleted);

		-- se elimina de donde era colaborador los tableros
		DELETE	ESTUDIANTE_TABLERO
		WHERE	correoColaborador IN (SELECT correoInstitucional FROM deleted);

		-- se eliminan las amistades
		DELETE	ESTUDIANTE_AMIGO
		WHERE	correoEstudiante IN (SELECT correoInstitucional FROM deleted);

		-- se eliminan las notificaciones
		DELETE	NOTIFICACION
		WHERE	correoEstudiante IN (SELECT correoInstitucional FROM deleted);

		-- se eliminan las solicitudes
		DELETE	SOLICITUD
		WHERE	correoEmisor IN (SELECT correoInstitucional FROM deleted) OR
				correoReceptor IN (SELECT correoInstitucional FROM deleted);

		-- se eliminan los tableros creados por el estudiante
		DELETE	TABLERO
		WHERE	correoEstudiante IN (SELECT correoInstitucional FROM deleted);

		-- finalmente se elimina el usuario
		DELETE	ESTUDIANTE
		WHERE	correoInstitucional IN (SELECT correoInstitucional FROM deleted)
END