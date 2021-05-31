USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetResponsablesTarea(
@correo VARCHAR(50),
@nombreTablero VARCHAR(50),
@nombreTarea VARCHAR(50),
@estado VARCHAR(50))
AS
SELECT	(E.primerNombre + ' ' + E.primerApellido) AS nombre,
		E.correoInstitucional
FROM	ESTUDIANTE AS E, TAREA_ESTUDIANTE AS TE
WHERE	TE.correoEstudiante = @correo AND
		TE.nombreTablero = @nombreTablero AND
		TE.nombreTarea = @nombreTarea AND
		TE.nombreEstado = @estado AND
		TE.correoResponsable = E.correoInstitucional;

GO

EXEC	spGetColaboradoresTarea @correo = 'kevinar51@estudiantec.cr', @nombreTablero = 'Maluma 2021',
		@nombreTarea = 'Hawái', @estado = 'Me gusta';