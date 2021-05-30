/*
--------------------------------------------------------------------
� 2021 TASKPLANNERCE
--------------------------------------------------------------------
Nombre   : Crear tablas
Version	 : 2.0
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
	PRIMARY KEY(correoInstitucional)
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
	PRIMARY KEY(correoInstitucional)
);


CREATE TABLE TABLERO (
	correoEstudiante		VARCHAR(50)		NOT NULL,
	nombre					VARCHAR(50)		NOT NULL,
	tipo					VARCHAR(50)		NOT NULL,
	descripcion				VARCHAR(200),
	PRIMARY KEY(correoEstudiante, nombre)
);

CREATE TABLE ESTADO(
	correoEstudiante		VARCHAR(50)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	nombre					VARCHAR(50)		NOT NULL,
	PRIMARY KEY(correoEstudiante, nombreTablero, nombre)
);

CREATE TABLE TAREA(
	correoEstudiante		VARCHAR(50)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	nombreEstado			VARCHAR(50)		NOT NULL,
	nombre					VARCHAR(50)		NOT NULL,
	descripcion				VARCHAR(200),
	fechaInicio				DATE			NOT NULL,
	fechaFinalizacion		DATE			NOT NULL,
	PRIMARY KEY(correoEstudiante, nombreTablero, nombreEstado, nombre)
);

-- SE CREAN LAS TABLAS CON RELACIONES MUCHOS A MUCHOS

CREATE TABLE ESTUDIANTE_AMIGO(
	correoEstudiante		VARCHAR(50)		NOT NULL,
	correoAmigo				VARCHAR(50)		NOT NULL,
	PRIMARY KEY(correoEstudiante, correoAmigo)
);


CREATE TABLE TABLERO_PROFESOR(
	correoEstudiante		VARCHAR(50)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	correoProfesor			VARCHAR(50)		NOT NULL,
	PRIMARY KEY(correoEstudiante, nombreTablero, correoProfesor)
);

CREATE TABLE TAREA_ESTUDIANTE(
	correoEstudiante		VARCHAR(50)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	nombreEstado			VARCHAR(50)		NOT NULL,
	nombreTarea				VARCHAR(50)		NOT NULL,
	correoResponsable		VARCHAR(50)		NOT NULL,
	PRIMARY KEY(correoEstudiante, nombreTablero, nombreEstado, nombreTarea, correoResponsable)
);

CREATE TABLE TAREA_DEPENDENCIA(
	correoEstudiante		VARCHAR(50)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	nombreEstado			VARCHAR(50)		NOT NULL,
	nombreTarea				VARCHAR(50)		NOT NULL,
	nombreTareaDependiente	VARCHAR(50)		NOT NULL,
	PRIMARY KEY(correoEstudiante, nombreTablero, nombreEstado, nombreTarea)
);

CREATE TABLE ESTUDIANTE_TABLERO(
	correoEstudiante		VARCHAR(50)		NOT NULL,
	nombreTablero			VARCHAR(50)		NOT NULL,
	correoColaborador		VARCHAR(50)     NOT NULL,
	PRIMARY KEY(correoEstudiante, nombreTablero, correoColaborador)
);

-- SE AGREGAN LAS LLAVES FOR�NEAS

ALTER TABLE TABLERO
ADD FOREIGN KEY (correoEstudiante) REFERENCES ESTUDIANTE(correoInstitucional);

ALTER TABLE ESTADO
ADD FOREIGN KEY	(correoEstudiante, nombreTablero) REFERENCES TABLERO(correoEstudiante, nombre);

ALTER TABLE TAREA
ADD FOREIGN KEY (correoEstudiante, nombreTablero, nombreEstado)
REFERENCES ESTADO(correoEstudiante, nombreTablero, nombre);

ALTER TABLE TAREA_ESTUDIANTE
ADD FOREIGN KEY (correoEstudiante, nombreTablero, nombreEstado, nombreTarea)
REFERENCES TAREA(correoEstudiante, nombreTablero, nombreEstado, nombre),
FOREIGN KEY (correoResponsable) REFERENCES ESTUDIANTE(correoInstitucional);

ALTER TABLE	ESTUDIANTE_AMIGO
ADD FOREIGN KEY (correoEstudiante) REFERENCES ESTUDIANTE(correoInstitucional),
FOREIGN KEY (correoAmigo) REFERENCES ESTUDIANTE(correoInstitucional);

ALTER TABLE TABLERO_PROFESOR
ADD FOREIGN KEY (correoEstudiante, nombreTablero) 
REFERENCES TABLERO(correoEstudiante, nombre),
FOREIGN KEY (correoProfesor) REFERENCES PROFESOR(correoInstitucional);

ALTER TABLE TAREA_DEPENDENCIA
ADD FOREIGN KEY (correoEstudiante, nombreTablero, nombreEstado, nombreTarea)
REFERENCES TAREA(correoEstudiante, nombreTablero, nombreEstado, nombre);

ALTER TABLE ESTUDIANTE_TABLERO
ADD FOREIGN KEY (correoEstudiante, nombreTablero) REFERENCES TABLERO(correoEstudiante, nombre),
FOREIGN KEY (correoColaborador) REFERENCES ESTUDIANTE(correoInstitucional);