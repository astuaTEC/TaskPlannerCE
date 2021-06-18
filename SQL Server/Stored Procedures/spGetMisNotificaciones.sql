USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spGetMisNotificaciones(
@miCorreo VARCHAR(50))
AS
SELECT Id, correoEstudiante, descripcion, fecha
FROM NOTIFICACION 
WHERE correoEstudiante = @miCorreo;

GO