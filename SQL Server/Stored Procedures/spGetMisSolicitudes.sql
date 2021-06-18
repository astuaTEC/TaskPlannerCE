USE TaskPlannerCEDB;
GO

ALTER PROCEDURE spGetMisSolicitudes(
@miCorreo VARCHAR(50))
AS
SELECT correoEmisor, correoReceptor, estado, (primerNombre + ' ' + segundoNombre + ' ' + primerApellido + ' ' + segundoApellido) AS nombre
FROM SOLICITUD, ESTUDIANTE
WHERE correoReceptor = @miCorreo AND
	  correoEmisor = correoInstitucional;

GO

EXEC spGetMisSolicitudes @miCorreo = 'kevinar51@estudiantec.cr';