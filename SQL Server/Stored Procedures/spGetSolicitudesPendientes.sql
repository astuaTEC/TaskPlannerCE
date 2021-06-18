USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetSolicitudesPendientes(
@miCorreo VARCHAR(50))
AS
SELECT correoEmisor AS correo, estado
FROM SOLICITUD 
WHERE correoReceptor = @miCorreo AND
	  estado = 'Pendiente'
UNION
SELECT correoReceptor AS correo, estado
FROM SOLICITUD 
WHERE correoEmisor = @miCorreo AND
	  estado = 'Pendiente'

GO

EXEC spGetSolicitudesPendientes @miCorreo = 'kevinar51@estudiantec.cr';