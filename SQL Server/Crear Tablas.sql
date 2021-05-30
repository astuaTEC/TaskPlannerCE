/*
--------------------------------------------------------------------
© 2021 TASKPLANNERCE
--------------------------------------------------------------------
Nombre   : Crear tablas
Version	 : 1.0
--------------------------------------------------------------------
*/


-- SE CREAN LAS TABLAS


CREATE TABLE ESTUDIANTE(
	carnet					VARCHAR(10)			NOT NULL,
	correoInstitucional		VARCHAR(50)			NOT NULL,
	primerNombre			VARCHAR(50)			NOT NULL,
	segundoNombre			VARCHAR(50),
	primerApellido			VARCHAR(50)			NOT NULL,
	segundoApellido			VARCHAR(50)			NOT NULL,
	telefono				VARCHAR(12)			NOT NULL,
	carreraMatriculada		VARCHAR(50)			NOT NULL,
	provinciaResidencia		VARCHAR(50)			NOT NULL,
	provinciaUniversidad	VARCHAR(50)			NOT NULL,
	areaDeInteres			VARCHAR(50)			NOT NULL,
	PRIMARY KEY(carnet)
);


CREATE TABLE PROFESOR(
	carnet					VARCHAR(10)			NOT NULL,
	correoInstitucional		VARCHAR(50)			NOT NULL,
	primerNombre			VARCHAR(50)			NOT NULL,
	segundoNombre			VARCHAR(50),
	primerApellido			VARCHAR(50)			NOT NULL,
	segundoApellido			VARCHAR(50)			NOT NULL,
	telefono				VARCHAR(12)			NOT NULL,
	administrador			BIT,
	PRIMARY KEY(carnet)
);


CREATE TABLE TABLERO (
	carnetEstudiante		VARCHAR(10)		NOT NULL,
	nombre					VARCHAR(50)		NOT NULL,
	tipo					VARCHAR(50)		NOT NULL,
	descripcion				VARCHAR(200),
	PRIMARY KEY(carnetEstudiante, nombre)
);

CREATE TABLE ESTADO(
	carnetEstudiante		VARCHAR(10)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	nombre					VARCHAR(50)		NOT NULL,
	PRIMARY KEY(carnetEstudiante, nombreTablero, nombre)
);

CREATE TABLE TAREA(
	carnetEstudiante		VARCHAR(10)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	nombreEstado			VARCHAR(50)		NOT NULL,
	nombre					VARCHAR(50)		NOT NULL,
	descripcion				VARCHAR(200),
	fechaInicio				DATE			NOT NULL,
	fechaFinalizacion		DATE			NOT NULL,
	PRIMARY KEY(carnetEstudiante, nombreTablero, nombreEstado, nombre)
);

-- SE CREAN LAS TABLAS CON RELACIONES MUCHOS A MUCHOS

CREATE TABLE ESTUDIANTE_AMIGO(
	carnetEstudiante		VARCHAR(10)		NOT NULL,
	carnetAmigo				VARCHAR(10)		NOT NULL,
	PRIMARY KEY(carnetEstudiante)
);


CREATE TABLE TABLERO_PROFESOR(
	carnetEstudiante		VARCHAR(10)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	carnetProfesor			VARCHAR(10)		NOT NULL,
	PRIMARY KEY(carnetEstudiante, nombreTablero, carnetProfesor)
);

CREATE TABLE TAREA_ESTUDIANTE(
	carnetEstudiante		VARCHAR(10)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	nombreEstado			VARCHAR(50)		NOT NULL,
	nombreTarea				VARCHAR(50)		NOT NULL,
	carnetResponsable		VARCHAR(10)		NOT NULL,
	PRIMARY KEY(carnetEstudiante, nombreTablero, nombreEstado, nombreTarea, carnetResponsable)
);

CREATE TABLE TAREA_DEPENDENCIA(
	carnetEstudiante		VARCHAR(10)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	nombreEstado			VARCHAR(50)		NOT NULL,
	nombreTarea				VARCHAR(50)		NOT NULL,
	nombreTareaDependiente	VARCHAR(50)		NOT NULL,
	PRIMARY KEY(carnetEstudiante, nombreTablero, nombreEstado, nombreTarea)
);

CREATE TABLE ESTUDIANTE_TABLERO(
	carnetEstudiante		VARCHAR(10)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	carnetColaborador		VARCHAR(10)     NOT NULL,
	PRIMARY KEY(carnetEstudiante, nombreTablero)
);


-- SE AGREGAN LAS LLAVES FORÁNEAS

ALTER TABLE TABLERO
ADD FOREIGN KEY (carnetEstudiante) REFERENCES ESTUDIANTE(carnet);

ALTER TABLE ESTADO
ADD FOREIGN KEY	(carnetEstudiante, nombreTablero) REFERENCES TABLERO(carnetEstudiante, nombre);

ALTER TABLE TAREA
ADD FOREIGN KEY (carnetEstudiante, nombreTablero, nombreEstado)
REFERENCES ESTADO(carnetEstudiante, nombreTablero, nombre);

ALTER TABLE TAREA_ESTUDIANTE
ADD FOREIGN KEY (carnetEstudiante, nombreTablero, nombreEstado, nombreTarea)
REFERENCES TAREA(carnetEstudiante, nombreTablero, nombreEstado, nombre),
FOREIGN KEY (carnetResponsable) REFERENCES ESTUDIANTE(carnet);

ALTER TABLE	ESTUDIANTE_AMIGO
ADD FOREIGN KEY (carnetEstudiante) REFERENCES ESTUDIANTE(carnet),
FOREIGN KEY (carnetAmigo) REFERENCES ESTUDIANTE(carnet);

ALTER TABLE TABLERO_PROFESOR
ADD FOREIGN KEY (carnetEstudiante, nombreTablero) 
REFERENCES TABLERO(carnetEstudiante, nombre),
FOREIGN KEY (carnetProfesor) REFERENCES PROFESOR(carnet);

ALTER TABLE TAREA_DEPENDENCIA
ADD FOREIGN KEY (carnetEstudiante, nombreTablero, nombreEstado, nombreTarea)
REFERENCES TAREA(carnetEstudiante, nombreTablero, nombreEstado, nombre);

ALTER TABLE ESTUDIANTE_TABLERO
ADD FOREIGN KEY (carnetEstudiante, nombreTablero) REFERENCES TABLERO(carnetEstudiante, nombre),
FOREIGN KEY (carnetColaborador) REFERENCES ESTUDIANTE(carnet);