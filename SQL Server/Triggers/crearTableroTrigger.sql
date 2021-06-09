USE TaskPlannerCEDB;
GO

create TRIGGER crearTableroTrigger
ON TABLERO
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO ESTADO (correoEstudiante, nombreTablero, nombre)
	SELECT	i.correoEstudiante, i.nombre, tte.nombreEstado
	FROM	TIPO_TABLERO as tt, TIPO_TABLERO_ESTADO as tte, inserted as i
	WHERE	tt.nombre = tte.nombreTipo AND
			i.tipo = tt.nombre;

END