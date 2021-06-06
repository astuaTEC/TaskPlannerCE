USE TaskPlannerCEDB;
GO

alter PROCEDURE spActualizarEstadoSolicitud(
@correoE VARCHAR(50),
@correoR VARCHAR(50),
@estado VARCHAR(15))
AS
UPDATE	SOLICITUD
SET		estado = @estado
WHERE	correoEmisor = @correoE AND
		correoReceptor = @correoR;
GO

EXEC spActualizarEstadoSolicitud @correoE = 'sam.astua@estudiantec.cr', @correoR = 'ejemplo@estudiantec.cr', @estado = 'Rechazado';