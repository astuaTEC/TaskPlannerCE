/*
--------------------------------------------------------------------
© 2021 TASKPLANNERCE - DATIC
--------------------------------------------------------------------
Nombre   : Crear tablas
Version	 : 1.0
--------------------------------------------------------------------
*/

CREATE TABLE ESTUDIANTE(
	correoInstitucional		VARCHAR(50)		NOT NULL,
	carnetInstitucional		VARCHAR(10)		NOT NULL,
	contrasena				VARCHAR(50)		NOT NULL,
	carrera					VARCHAR(50)		NOT NULL,
	activo					BIT				NOT NULL,
	PRIMARY KEY(correoInstitucional, carnetInstitucional)
);

CREATE TABLE PROFESOR(
	correoInstitucional		VARCHAR(50)		NOT NULL,
	contrasena				VARCHAR(50)		NOT NULL,
	cedula					VARCHAR(15)		NOT NULL,
	PRIMARY KEY (correoInstitucional, cedula)
);


