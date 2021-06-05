USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarResponsable(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombreTarea VARCHAR(50),
@correoR VARCHAR(50))
AS
DELETE	TAREA_ESTUDIANTE
WHERE	@correo = correoEstudiante AND
		@nombreTablero = nombreTablero AND
		@nombreTarea = nombreTarea AND
		@correoR = correoResponsable;

GO

EXEC	spEliminarResponsable @correo = 'kevinar51@estudiantec.cr', @nombreTablero = 'Maluma 2021',
		@nombreTarea = 'Hawái', @correoR = '';