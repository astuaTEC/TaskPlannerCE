USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetColaboradoresTablero(
@correo VARCHAR(50),
@nombre VARCHAR(50))
AS
SELECT	(E.primerNombre + ' ' + E.segundoNombre  + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre,
		E.correoInstitucional
FROM	ESTUDIANTE AS E, ESTUDIANTE_TABLERO AS ET 
WHERE	(ET.correoEstudiante = @correo AND
		ET.nombreTablero = @nombre AND
		ET.correoColaborador = E.correoInstitucional)
UNION
SELECT	(E.primerNombre + ' ' + E.segundoNombre  + ' ' + E.primerApellido + ' ' + E.segundoApellido) AS nombre,
		E.correoInstitucional
FROM	ESTUDIANTE AS E
WHERE	E.correoInstitucional = @correo;


GO

EXEC spGetColaboradoresTablero @correo = 'kevinar51@estudiantec.cr', @nombre = 'Maluma 2021';