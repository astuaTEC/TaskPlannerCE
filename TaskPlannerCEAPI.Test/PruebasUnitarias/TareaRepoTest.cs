using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.DTO;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCEAPI.Test.PruebasUnitarias
{
    [TestClass]
    public class TareaRepoTest : BasePruebas
    {
        [TestMethod]
        public void CrearTarea()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            var tarea = new Tarea()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Tablero 1",
                IdEstado = 1,
                Nombre = "Tarea Nueva",
                Descripcion = "Esta es una tarea de prueba",
                FechaInicio = DateTime.Parse("2021-05-25"),
                FechaFinalizacion = DateTime.Now
            };

            //prueba
            var repo = new TareaRepo(contexto);
            repo.CrearTarea(tarea);
            repo.SaveChanges();
            var resultadoEsperado1 = DateTime.Parse("2021-05-25");
            var resultadoEsperado2 = 1;
            var resultado = contexto.Tareas.Find("sam.astua@estudiantec.cr", "Tablero 1", "Tarea Nueva");

            //verificación
            Assert.AreEqual(resultadoEsperado1, resultado.FechaInicio);
            Assert.AreEqual(resultadoEsperado2, resultado.IdEstado);
        }

        [TestMethod]
        public void actualizarTarea()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            var tarea = new Tarea()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Tablero 1",
                IdEstado = 1,
                Nombre = "Tarea Nueva",
                Descripcion = "Esta es una tarea de prueba",
                FechaInicio = DateTime.Parse("2021-05-25"),
                FechaFinalizacion = DateTime.Now
            };
            contexto.Tareas.Add(tarea);
            contexto.SaveChanges();

            //prueba
            var repo = new TareaRepo(contexto);
            var resultadoEsperado = 2;
            tarea.IdEstado = 2;
            repo.ActualizarTarea(tarea);
            repo.SaveChanges();

            var resultado = contexto.Tareas.Find("sam.astua@estudiantec.cr", "Tablero 1", "Tarea Nueva");

            //verificación
            Assert.AreEqual(resultadoEsperado, resultado.IdEstado);
        }

        [TestMethod]
        public void AgregarDependencia()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            var dependencia = new TareaDependencium()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Tablero 1",
                NombreTarea = "Tarea Nueva",
                NombreTareaDependiente = "Tarea 1"
            };

            //prueba
            var repo = new TareaRepo(contexto);
            repo.AgregarDependencia(dependencia);
            repo.SaveChanges();
            var resultadoEsperado = "Tarea 1";
            var resultado = contexto.TareaDependencia.Find("sam.astua@estudiantec.cr", "Tablero 1", "Tarea Nueva", "Tarea 1");

            //verificación
            Assert.AreEqual(resultadoEsperado, resultado.NombreTareaDependiente);
        }

        [TestMethod]
        public void AgregarDependenciaLista()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);
            var lista = new List<TareaDependencium>();

            var dependencia1 = new TareaDependencium()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Tablero 1",
                NombreTarea = "Tarea Nueva",
                NombreTareaDependiente = "Tarea 1"
            };
            var dependencia2 = new TareaDependencium()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Tablero 1",
                NombreTarea = "Tarea Nueva",
                NombreTareaDependiente = "Tarea 2"
            };
            lista.Add(dependencia1);
            lista.Add(dependencia2);

            //prueba
            var repo = new TareaRepo(contexto);
            repo.AgregarDependencia(lista);
            repo.SaveChanges();
            var resultadoEsperado1 = "Tarea 1";
            var resultadoEsperado2 = "Tarea 2";
            var resultado1 = contexto.TareaDependencia.Find("sam.astua@estudiantec.cr", "Tablero 1", "Tarea Nueva", "Tarea 1");
            var resultado2 = contexto.TareaDependencia.Find("sam.astua@estudiantec.cr", "Tablero 1", "Tarea Nueva", "Tarea 2");

            //verificación
            Assert.AreEqual(resultadoEsperado1, resultado1.NombreTareaDependiente);
            Assert.AreEqual(resultadoEsperado2, resultado2.NombreTareaDependiente);
        }

        [TestMethod]
        public void agregarResponsablesLista()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);
            var lista = new List<TareaEstudiante>();

            var responsable1 = new TareaEstudiante()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Tablero 1",
                NombreTarea = "Tarea 1",
                CorreoResponsable = "kevinar51@estudiantec.cr"
            };
            var responsable2 = new TareaEstudiante()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Tablero 1",
                NombreTarea = "Tarea 1",
                CorreoResponsable = "oscar.araya@estudiantec.cr"
            };
            lista.Add(responsable1);
            lista.Add(responsable2);

            //prueba
            var repo = new TareaRepo(contexto);
            repo.AgregarResponsables(lista);
            repo.SaveChanges();
            var resultadoEsperado1 = "kevinar51@estudiantec.cr";
            var resultadoEsperado2 = "oscar.araya@estudiantec.cr";
            var resultado1 = contexto.TareaEstudiantes.Find("sam.astua@estudiantec.cr", "Tablero 1",
                "Tarea 1", "kevinar51@estudiantec.cr");
            var resultado2 = contexto.TareaEstudiantes.Find("sam.astua@estudiantec.cr", "Tablero 1",
                "Tarea 1", "oscar.araya@estudiantec.cr");

            //verificación
            Assert.AreEqual(resultadoEsperado1, resultado1.CorreoResponsable);
            Assert.AreEqual(resultadoEsperado2, resultado2.CorreoResponsable);
        }

        [TestMethod]
        public void GetInfoTarea()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TareaRepo(contexto);
            var resultado = repo.GetInfoTarea("sam.astua@estudiantec.cr", "Tablero 1",
                "Tarea 1");

            //verificación
            Assert.AreEqual(typeof(TareaInfoDTO), resultado.GetType());
        }
    }
}
