USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetResponsablesTarea(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombreTarea VARCHAR(50))
AS
SELECT	(E.primerNombre + ' ' + E.segundoNombre + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre,
		E.correoInstitucional
FROM	ESTUDIANTE AS E, TAREA_ESTUDIANTE AS TE
WHERE	TE.correoEstudiante = @correo AND
		TE.nombreTablero = @nombreTablero AND
		TE.nombreTarea = @nombreTarea AND
		TE.correoResponsable = E.correoInstitucional;

GO

EXEC	spGetResponsablesTarea @correo = 'kevinar51@estudiantec.cr', @nombreTablero = 'Maluma 2021',
		@nombreTarea = 'Hawái';