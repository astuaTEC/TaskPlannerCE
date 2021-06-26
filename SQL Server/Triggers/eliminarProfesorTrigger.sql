USE TaskPlannerCEDB;
GO

CREATE TRIGGER eliminarProfesorTrigger
ON PROFESOR
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;

	-- Se eliminan las observaciones del profesor
	DELETE	TABLERO_PROFESOR
	WHERE	correoProfesor IN (SELECT correoInstitucional FROM deleted);

	-- Se elimina el profesor en si
	DELETE	PROFESOR
	WHERE	correoInstitucional IN (SELECT correoInstitucional FROM deleted);


END