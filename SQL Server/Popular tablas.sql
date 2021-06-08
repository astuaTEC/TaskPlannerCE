/*
--------------------------------------------------------------------
© 2021 TASKPLANNERCE
--------------------------------------------------------------------
Nombre   : Popular tablas
Version	 : 1.0
--------------------------------------------------------------------
*/

USE TaskPlannerCEDB
GO

--ESTUDIANTE

INSERT INTO ESTUDIANTE (carnet, correoInstitucional, primerNombre, segundoNombre, primerApellido, 
segundoApellido, telefono, carreraMatriculada, provinciaResidencia, provinciaUniversidad, areaDeInteres)
VALUES ('2018143188', 'sam.astua@estudiantec.cr', 'Saymon', '', 'Astúa', 'Madrigal', 
		'+50685681546', 'Ing. Computadores', 'San José', 'Cartago', 'Deportiva'),
	   ('2018002998', 'oscar.araya@estudiantec.cr', 'Oscar', 'Fernando', 'Araya', 'Garbanzo', 
		'+50660255252', 'Ing. Computadores', 'San José', 'Cartago', 'Académica'),
	   ('2018148661', 'kevinar51@estudiantec.cr', 'Kevin', 'Francisco', 'Acevedo', 'Rodríguez', 
		'+50683488906', 'Ing. Computadores', 'San José', 'Cartago', 'Cultural');

--PROFESOR
INSERT INTO PROFESOR(carnet, correoInstitucional, primerNombre,
segundoNombre, primerApellido, segundoApellido, telefono)
VALUES	('1111122222', 'luisB@profextec.cr', 'Luis', 'Antonio', 'Barquero', 'Villalobos', '+50688885555'),
		('3333344444', 'alfredo@profextec.cr', 'Alfredito', '', 'Cruz', 'Rodríguez', '+50688886666'),
		('5555566666', 'juanki@profextec.cr', 'Juan', 'Carlos', 'Abarca', 'Monge', '+50688881111');


-- ADMINISTRADOR
INSERT INTO ADMINISTRADOR(carnet, correoInstitucional, primerNombre,
segundoNombre, primerApellido, segundoApellido, telefono)
VALUES	('1010101010', 'lnoguera@profextec.cr', 'Luis', 'Diego', 'Noguera', 'Mena', '+50688888888');


-- ESTUDIANTE AMIGO
INSERT INTO ESTUDIANTE_AMIGO(correoEstudiante, correoAmigo)
VALUES	('sam.astua@estudiantec.cr', 'oscar.araya@estudiantec.cr'),
		('oscar.araya@estudiantec.cr', 'sam.astua@estudiantec.cr'),
		('sam.astua@estudiantec.cr', 'kevinar51@estudiantec.cr'),
		('kevinar51@estudiantec.cr','sam.astua@estudiantec.cr'),
		('kevinar51@estudiantec.cr', 'oscar.araya@estudiantec.cr'),
		('oscar.araya@estudiantec.cr', 'kevinar51@estudiantec.cr');


--TIPO_TABLERO
INSERT INTO TIPO_TABLERO(nombre)
VALUES	('Exámen'),
		('Tarea'),
		('Proyecto programación'),
		('Reporte escrito'),
		('Informe laboratorio'),
		('Proyecto'),
		('Actividad deportiva'),
		('Actividad cultural'),
		('Otro');

-- TABLERO
INSERT INTO TABLERO(correoEstudiante, nombre, tipo, descripcion, fechaCreacion)
VALUES ('sam.astua@estudiantec.cr', 'Tablero 1', 'Tarea', 'Este es un tablero para probar funcionalidades', '2021-06-01'), -- SAYMON
	   ('sam.astua@estudiantec.cr', 'Tablero 2', 'Reporte escrito', 'Este es un tablero para probar funcionalidades','2021-06-01'),
	   ('oscar.araya@estudiantec.cr', 'SyS 2021', 'Exámen', 'Este es un tablero para probar funcionalidades','2021-06-01'), --OSCAR
	   ('kevinar51@estudiantec.cr', 'Maluma 2021', 'Otro', 'Este es un tablero para probar funcionalidades','2021-06-01'); -- KEVIN


-- ESTUDIANTE_TABLERO (COLABORADORES)
INSERT INTO ESTUDIANTE_TABLERO(correoEstudiante, nombreTablero, correoColaborador)
VALUES	('kevinar51@estudiantec.cr', 'Maluma 2021', 'sam.astua@estudiantec.cr'),
		('oscar.araya@estudiantec.cr', 'SyS 2021','sam.astua@estudiantec.cr'),
		('kevinar51@estudiantec.cr', 'Maluma 2021', 'oscar.araya@estudiantec.cr');

-- TABLERO PROFESOR
INSERT INTO TABLERO_PROFESOR (correoEstudiante, nombreTablero, correoProfesor)
VALUES	('sam.astua@estudiantec.cr', 'Tablero 1', 'luisB@profextec.cr'),
		('kevinar51@estudiantec.cr', 'Maluma 2021', 'luisB@profextec.cr');

--ESTADO
INSERT INTO ESTADO (Id, correoEstudiante, nombreTablero, nombre)
VALUES (1, 'sam.astua@estudiantec.cr', 'Tablero 1', 'Estado A'), -- TABLERO 1 (SAYMON)
	   (2, 'sam.astua@estudiantec.cr', 'Tablero 1', 'Estado B'),
	   (3, 'sam.astua@estudiantec.cr', 'Tablero 1', 'Estado C'),
	   (1, 'oscar.araya@estudiantec.cr', 'SyS 2021', 'Estudiar'), -- SYS 2021 (OSCAR)
	   (2, 'oscar.araya@estudiantec.cr', 'SyS 2021', 'Estudiando'),
	   (3, 'oscar.araya@estudiantec.cr', 'SyS 2021', 'Aprendido'),
	   (1, 'kevinar51@estudiantec.cr', 'Maluma 2021', 'No me gusta'), -- MALUMA 2021 (KEVIN)
	   (2, 'kevinar51@estudiantec.cr', 'Maluma 2021', 'Me gusta'),
	   (3, 'kevinar51@estudiantec.cr', 'Maluma 2021', 'Me encanta');

-- TAREA
INSERT INTO TAREA(correoEstudiante, nombreTablero, IdEstado, nombre, descripcion, fechaInicio, fechaFinalizacion)
VALUES	('sam.astua@estudiantec.cr', 'Tablero 1', 1, 'Tarea 1', 'Hacer algo', '2021-05-29', '2021-06-06'), -- SAYMON
		('sam.astua@estudiantec.cr', 'Tablero 1', 1, 'Tarea 2', 'Hacer algo en 2', '2021-05-29', '2021-06-08'),
		('sam.astua@estudiantec.cr', 'Tablero 1', 2, 'Tarea 3', 'Hacer algo en 3', '2021-05-29', '2021-06-04'),
		('oscar.araya@estudiantec.cr', 'SyS 2021', 1, 'Tarea A', 'Estudiar esto', '2021-05-29', '2021-06-05'), --OSCAR
		('oscar.araya@estudiantec.cr', 'SyS 2021', 2, 'Tarea B', 'Estudiar esto otro', '2021-05-29', '2021-06-06'),
		('oscar.araya@estudiantec.cr', 'SyS 2021', 3, 'Tarea C', 'Estudiar esto otro', '2021-05-29', '2021-06-02'),
		('kevinar51@estudiantec.cr', 'Maluma 2021', 1, 'Perfecta', 'Escuchar esto', '2021-05-29', '2021-06-01'), -- KEVIN
		('kevinar51@estudiantec.cr', 'Maluma 2021', 2, 'Hawái', 'Escuchar esto', '2021-05-29', '2021-06-02'),
		('kevinar51@estudiantec.cr', 'Maluma 2021', 3, 'ADMV', 'Escuchar esto', '2021-05-29', '2021-06-03');

-- TAREA_ESTUDIANTE
INSERT INTO TAREA_ESTUDIANTE(correoEstudiante, nombreTablero, nombreTarea, correoResponsable)
VALUES	('kevinar51@estudiantec.cr', 'Maluma 2021', 'Perfecta', 'sam.astua@estudiantec.cr'),
		('kevinar51@estudiantec.cr', 'Maluma 2021', 'Hawái', 'oscar.araya@estudiantec.cr');

-- TAREA DEPENDENCIA
INSERT INTO TAREA_DEPENDENCIA(correoEstudiante, nombreTablero, nombreTarea, nombreTareaDependiente)
VALUES	('sam.astua@estudiantec.cr', 'Tablero 1', 'Tarea 2', 'Tarea 3'),
		('sam.astua@estudiantec.cr', 'Tablero 1', 'Tarea 1', 'Tarea 2');