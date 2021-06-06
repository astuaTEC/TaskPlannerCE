USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetMisSolicitudes(
@miCorreo VARCHAR(50))
AS
SELECT correoEmisor, correoReceptor, estado
FROM SOLICITUD 
WHERE correoReceptor = @miCorreo;

GO

EXEC spGetMisSolicitudes @miCorreo = 'ejemplo@estudiantec.cr';