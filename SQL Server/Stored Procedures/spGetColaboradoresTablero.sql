USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetColaboradoresTablero(
@correo VARCHAR(50),
@nombre VARCHAR(50))
AS
SELECT	(E.primerNombre + ' ' + E.primerApellido) AS nombre,
		E.correoInstitucional
FROM	ESTUDIANTE AS E, ESTUDIANTE_TABLERO AS ET 
WHERE	ET.correoEstudiante = @correo AND
		ET.nombreTablero = @nombre AND
		ET.correoColaborador = E.correoInstitucional;

GO

EXEC spGetColaboradoresTablero @correo = 'kevinar51@estudiantec.cr', @nombre = 'Maluma 2021';