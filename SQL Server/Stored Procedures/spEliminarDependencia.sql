USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarDependencia(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombreTarea VARCHAR(50),
@nombreTareaD VARCHAR(50))
AS
DELETE	TAREA_DEPENDENCIA
WHERE	@correo = correoEstudiante AND
		@nombreTablero = nombreTablero AND
		@nombreTarea = nombreTarea AND
		@nombreTareaD = nombreTareaDependiente;

GO

EXEC	spEliminarDependencia @correo = 'kevinar51@estudiantec.cr', @nombreTablero = 'Maluma 2021',
		@nombreTarea = 'Hawái', @nombreTareaD = '';