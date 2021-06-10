USE TaskPlannerCEDB;
GO

alter PROCEDURE spGetTablerosPorMes(
@correo VARCHAR(50))
AS
SELECT	MONTH(fechaCreacion) AS mes, COUNT(*) AS cantidad
FROM	TABLERO
WHERE	correoEstudiante = @correo AND
		fechaCreacion >= GETDATE()-180 --está restando seis meses a la fecha actual
GROUP BY MONTH(fechaCreacion)
ORDER BY MONTH(fechaCreacion) DESC;

GO


EXEC spGetTablerosPorMes @correo = 'sam.astua@estudiantec.cr';