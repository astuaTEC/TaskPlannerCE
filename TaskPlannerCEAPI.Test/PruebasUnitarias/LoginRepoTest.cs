using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.DaticModels;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCEAPI.Test.PruebasUnitarias
{
    [TestClass]
    public class LoginRepoTest: BasePruebas
    {
        [TestMethod]
        public void inicioDeSesionEstudianteValido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            contexto.Estudiantes.Add(new Estudiante()
            {
                Carnet = "2018143188",
                CorreoInstitucional = "sam.astua@estudiantec.cr",
                PrimerNombre = "Saymon",
                SegundoNombre = "",
                PrimerApellido = "Astúa",
                SegundoApellido = "Madrigal",
                Telefono = "+50685681546",
                CarreraMatriculada = "Ingeniería en Computadores",
                ProvinciaResidencia = "San José",
                ProvinciaUniversidad = "Cartago",
                AreaDeInteres = "Deportiva"
            });

            contexto.SaveChanges();

            var login = new Login() { correoInstitucional = "sam.astua@estudiantec.cr", contrasena = "123456" };


            // prueba
            var repo = new LoginRepo(contexto);

            var respuesta = repo.verificarLogin(login);

            //verificacion
            Assert.AreEqual(true, respuesta.estudiante);
        }

        [TestMethod]
        public void inicioDeSesionEstudianteInvalido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            contexto.Estudiantes.Add(new Estudiante()
            {
                Carnet = "2018143188",
                CorreoInstitucional = "sam.astua@estudiantec.cr",
                PrimerNombre = "Saymon",
                SegundoNombre = "",
                PrimerApellido = "Astúa",
                SegundoApellido = "Madrigal",
                Telefono = "+50685681546",
                CarreraMatriculada = "Ingeniería en Computadores",
                ProvinciaResidencia = "San José",
                ProvinciaUniversidad = "Cartago",
                AreaDeInteres = "Deportiva"
            });
            contexto.SaveChanges();

            var login = new Login() { correoInstitucional = "sam.astua@estudiantec.cr", contrasena = "1234" };


            // prueba
            var repo = new LoginRepo(contexto);

            var respuesta = repo.verificarLogin(login);

            //verificacion
            Assert.IsNull(respuesta);
        }

        [TestMethod]
        public void inicioDeSesionProfesorValido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            contexto.Profesors.Add(new Profesor()
            {
                Carnet = "3333344444",
                CorreoInstitucional = "alfredo@profextec.cr",
                PrimerNombre = "Alfredito",
                SegundoNombre = "",
                PrimerApellido = "Cruz",
                SegundoApellido = "Rodríguez",
                Telefono = "+50688886666"
            });
            contexto.SaveChanges();

            var login = new Login() { correoInstitucional = "alfredo@profextec.cr", contrasena = "123456" };


            // prueba
            var repo = new LoginRepo(contexto);

            var respuesta = repo.verificarLogin(login);

            //verificacion
            Assert.AreEqual(true, respuesta.profesor);
        }

        [TestMethod]
        public void inicioDeSesionProfesorInvalido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            contexto.Profesors.Add(new Profesor()
            {
                Carnet = "3333344444",
                CorreoInstitucional = "alfredo@profextec.cr",
                PrimerNombre = "Alfredito",
                SegundoNombre = "",
                PrimerApellido = "Cruz",
                SegundoApellido = "Rodríguez",
                Telefono = "+50688886666"
            });
            contexto.SaveChanges();

            var login = new Login() { correoInstitucional = "alfredo@profextec.cr", contrasena = "1236" };


            // prueba
            var repo = new LoginRepo(contexto);

            var respuesta = repo.verificarLogin(login);

            //verificacion
            Assert.IsNull(respuesta);
        }

        [TestMethod]
        public void registrarEstudianteValido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            var estudiante = new Estudiante()
            {
                Carnet = "2018143188",
                CorreoInstitucional = "sam.astua@estudiantec.cr",
                PrimerNombre = "Saymon",
                SegundoNombre = "",
                PrimerApellido = "Astúa",
                SegundoApellido = "Madrigal",
                Telefono = "+50685681546",
                CarreraMatriculada = "Ingeniería en Computadores",
                ProvinciaResidencia = "San José",
                ProvinciaUniversidad = "Cartago",
                AreaDeInteres = "Deportiva"
            };

            // prueba
            var repo = new LoginRepo(contexto);
            var respuesta = repo.RegistrarEstudiante(estudiante);
            repo.SaveChanges();

            //verificacion
            Assert.IsTrue(respuesta);
        }

        [TestMethod]
        public void registrarEstudianteInvalido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            var estudiante = new Estudiante()
            {
                Carnet = "2003141414",
                CorreoInstitucional = "veterano@estudiantec.cr",
                PrimerNombre = "Ejemplo",
                SegundoNombre = "",
                PrimerApellido = "Apellido1",
                SegundoApellido = "Apellido2",
                Telefono = "+50612345678",
                CarreraMatriculada = "Administración de Empresas",
                ProvinciaResidencia = "San José",
                ProvinciaUniversidad = "Cartago",
                AreaDeInteres = "Académica"
            };

            // prueba
            var repo = new LoginRepo(contexto);
            var respuesta = repo.RegistrarEstudiante(estudiante);
            repo.SaveChanges();

            //verificacion
            Assert.IsFalse(respuesta);
        }

        [TestMethod]
        public void registrarProfesorValido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            var profesor = new Profesor()
            {
                Carnet = "3333344444",
                CorreoInstitucional = "alfredo@profextec.cr",
                PrimerNombre = "Alfredito",
                SegundoNombre = "",
                PrimerApellido = "Cruz",
                SegundoApellido = "Rodríguez",
                Telefono = "+50688886666"
            };

            // prueba
            var repo = new LoginRepo(contexto);
            var respuesta = repo.RegistrarProfesor(profesor);
            repo.SaveChanges();


            //verificación
            Assert.IsTrue(respuesta);
        }

        [TestMethod]
        public void registrarProfesorInvalido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            var profesor = new Profesor()
            {
                Carnet = "1111100000",
                CorreoInstitucional = "noexiste@profextec.cr",
                PrimerNombre = "Nombre",
                SegundoNombre = "",
                PrimerApellido = "Apellido1",
                SegundoApellido = "Apellido2",
                Telefono = "+50687654321"
            };

            // prueba
            var repo = new LoginRepo(contexto);
            var respuesta = repo.RegistrarProfesor(profesor);
            repo.SaveChanges();


            //verificación
            Assert.IsFalse(respuesta);
        }

        [TestMethod]
        public void registrarAdministradorValido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            var admin = new Administrador()
            {
                Carnet = "3333344444",
                CorreoInstitucional = "alfredo@profextec.cr",
                PrimerNombre = "Alfredito",
                SegundoNombre = "",
                PrimerApellido = "Cruz",
                SegundoApellido = "Rodríguez",
                Telefono = "+50688886666"
            };

            // prueba
            var repo = new LoginRepo(contexto);
            var respuesta = repo.RegistrarAdmin(admin);
            repo.SaveChanges();


            //verificación
            Assert.IsTrue(respuesta);
        }

        [TestMethod]
        public void registrarAdminInvalido()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            var admin = new Administrador()
            {
                Carnet = "1111100000",
                CorreoInstitucional = "noexiste@profextec.cr",
                PrimerNombre = "Nombre",
                SegundoNombre = "",
                PrimerApellido = "Apellido1",
                SegundoApellido = "Apellido2",
                Telefono = "+50687654321"
            };

            // prueba
            var repo = new LoginRepo(contexto);
            var respuesta = repo.RegistrarAdmin(admin);
            repo.SaveChanges();


            //verificación
            Assert.IsFalse(respuesta);
        }
    }
}
