using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.DTO;
using TaskPlannerCE_API.Models.Views;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCEAPI.Test.PruebasUnitarias
{
    [TestClass]
    public class EstudianteRepoTest : BasePruebas
    {
        [TestMethod]
        public void accederInformacionDeEstudiante()
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

            //prueba
            var repo = new EstudianteRepo(contexto);

            var resultado = repo.GetMiInfo("sam.astua@estudiantec.cr");


            //verificación
            Assert.AreEqual("2018143188", resultado.Carnet);
            Assert.AreEqual("Saymon", resultado.PrimerNombre);
        }

        [TestMethod]
        public void ActualizarEstudiante()
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
            contexto.Estudiantes.Add(estudiante);
            contexto.SaveChanges();

            //prueba
            var repo = new EstudianteRepo(contexto);
            var nombreEsperado = "Nuevo segundoNombre";
            estudiante.SegundoNombre = "Nuevo segundoNombre";
            repo.ActualizarEstudiante(estudiante);
            repo.SaveChanges();
            var resultado = contexto.Estudiantes.Find("sam.astua@estudiantec.cr");


            //verificacion
            Assert.AreEqual(nombreEsperado, resultado.SegundoNombre);
        }

        [TestMethod]
        public void EnviarSolicitudDeAmistad()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            var solicitud = new Solicitud()
            {
                CorreoEmisor = "sam.astua@estudiantec.cr",
                CorreoReceptor = "kevinar51@estudiantec.cr",
                Estado = "Pendiente"
            };

            //prueba
            var repo = new EstudianteRepo(contexto);
            repo.EnviarSolicitudAmistad(solicitud);
            repo.SaveChanges();
            var resultado = contexto.Solicituds.Find("sam.astua@estudiantec.cr", "kevinar51@estudiantec.cr");

            //verificación
            Assert.AreEqual("sam.astua@estudiantec.cr", resultado.CorreoEmisor);
            Assert.AreEqual("kevinar51@estudiantec.cr", resultado.CorreoReceptor);

        }

        [TestMethod]
        public void GetUltimosCincoAmigos()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            var resultado = repo.GetUltimosCincoAmigos("sam.astua@estudiantec.cr");

            //validacion
            Assert.AreEqual(typeof(List<UltimosAmigosView>), resultado.GetType());
        }

        [TestMethod]
        public void GetTablerosPorMes()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            var resultado = repo.GetTablerosPorMes("sam.astua@estudiantec.cr");

            //validacion
            Assert.AreEqual(typeof(List<TablerosXmesDTO>), resultado.GetType());
        }

        [TestMethod]
        public void AccederALasSolicitudesDeAmistad()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            var resultado = repo.GetMisSolicitudes("sam.astua@estudiantec.cr");

            //validacion
            Assert.AreEqual(typeof(List<SolicitudView>), resultado.GetType());
        }

        [TestMethod]
        public void AccederALasSolicitudesPendientes()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            var resultado = repo.GetSolicitudesPendientes("sam.astua@estudiantec.cr");

            //validacion
            Assert.AreEqual(typeof(List<SolicitudPendienteView>), resultado.GetType());
        }

        [TestMethod]
        public void GetNumeroDeTableros()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            var resultado = repo.GetNumeroDeTableros("sam.astua@estudiantec.cr");

            //validacion
            Assert.AreEqual(typeof(int), resultado.GetType());
        }

        [TestMethod]
        public void getTodosEstudiantes()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            var resultado = repo.getTodosEstudiantes("sam.astua@estudiantec.cr");

            //validacion
            Assert.AreEqual(typeof(List<ColaboradoresView>), resultado.GetType());
        }

        [TestMethod]
        public void AccederMisAmigos()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            var resultado = repo.getMisAmigos("sam.astua@estudiantec.cr");

            //validacion
            Assert.AreEqual(typeof(List<BuscarAmigoView>), resultado.GetType());
        }

        [TestMethod]
        public void AccederEstudiantesNoAmigos()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            var resultado = repo.getEstudiantesNoAmigos("sam.astua@estudiantec.cr");

            //validacion
            Assert.AreEqual(typeof(List<BuscarEstudiantesView>), resultado.GetType());
        }

        [TestMethod]
        public void obtenerMes()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new EstudianteRepo(contexto);
            string resultadoEsperado1 = "Enero";
            string resultadoEsperado2 = "Diciembre";
            string resultado1 = repo.GenerarMes(1);
            string resultado2 = repo.GenerarMes(12);

            //verificación
            Assert.AreEqual(resultadoEsperado1, resultado1);
            Assert.AreEqual(resultadoEsperado2, resultado2);

        }
    }
}
