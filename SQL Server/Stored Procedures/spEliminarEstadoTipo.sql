USE TaskPlannerCEDB;
GO

CREATE PROCEDURE spEliminarEstadoTipo(
@nombreTipo VARCHAR(50),
@nombreEstado VARCHAR(50))
AS
DELETE	TIPO_TABLERO_ESTADO
WHERE	@nombreTipo = nombreTipo AND
		@nombreEstado = nombreEstado;

GO