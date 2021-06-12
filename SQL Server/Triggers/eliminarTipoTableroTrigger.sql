USE TaskPlannerCEDB;
GO

CREATE TRIGGER eliminarTipoTableroTrigger
ON TIPO_TABLERO
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;
	
	-- Se ACTUALIZAN LOS TABLEROS QUE DEPENDEN DEL TIPO QUE
	-- SE QUIERE BORRAR
	UPDATE	TABLERO
	SET tipo = 'Otro'
	WHERE	tipo IN (SELECT nombre FROM deleted) AND
			tipo != 'Otro';

	-- SE ELIMINAN LOS ESTADOS QUE DEPENDEN DE ESE TIPO
	DELETE	TIPO_TABLERO_ESTADO
	WHERE	nombreTipo IN (SELECT nombre FROM deleted) AND
			nombreTipo != 'Otro';

	-- se elimina finalmente el tipo
	DELETE	TIPO_TABLERO
	WHERE	nombre IN (SELECT nombre FROM deleted) AND
			nombre != 'Otro';

END