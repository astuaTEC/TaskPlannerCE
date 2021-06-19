using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using TaskPlannerCE_API.CPM;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.DTO;
using TaskPlannerCE_API.Models.Views;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCEAPI.Test.PruebasUnitarias
{
    [TestClass]
    public class TableroRepoTest : BasePruebas
    {
        [TestMethod]
        public void crearTablero()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);
            contexto.TipoTableros.Add(new TipoTablero() { Nombre = "Académico" });
            contexto.SaveChanges();

            var tablero = new Tablero()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                Nombre = "Nuevo Tablero",
                Tipo = "Académico",
                Descripcion = "Este es un nuevo tablero de prueba",
                FechaCreacion = DateTime.Now
            };

            //prueba
            var repo = new TableroRepo(contexto);
            repo.CrearTablero(tablero);
            repo.SaveChanges();
            var resultado = contexto.Tableros.Find("sam.astua@estudiantec.cr", "Nuevo Tablero");
            var resultadoEsperado = "Académico";


            //verificación
            Assert.AreEqual(resultadoEsperado, resultado.Tipo);
        }

        [TestMethod]
        public void Actualizartablero()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);
            contexto.TipoTableros.Add(new TipoTablero() { Nombre = "Académico" });
            contexto.SaveChanges();

            var tablero = new Tablero()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                Nombre = "Nuevo Tablero",
                Tipo = "Académico",
                Descripcion = "Este es un nuevo tablero de prueba",
                FechaCreacion = DateTime.Now
            };
            contexto.Tableros.Add(tablero);
            contexto.SaveChanges();

            //prueba
            var repo = new TableroRepo(contexto);
            var resultadoEsperado = DateTime.Parse("2021-05-10");
            tablero.FechaCreacion = DateTime.Parse("2021-05-10");
            repo.ActualizarTablero(tablero);
            repo.SaveChanges();

            var resultado = contexto.Tableros.Find("sam.astua@estudiantec.cr", "Nuevo Tablero");

            //verificación
            Assert.AreEqual(resultadoEsperado, resultado.FechaCreacion);

        }

        [TestMethod]
        public void CrearTipoTablero()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            var tipo = new TipoTablero() { Nombre = "Nuevo tipo" };


            //prueba
            var repo = new TableroRepo(contexto);
            repo.CrearTipoTablero(tipo);
            repo.SaveChanges();
            var resultadoEsperado = "Nuevo tipo";
            var resultado = contexto.TipoTableros.Find("Nuevo tipo");

            //verificación
            Assert.AreEqual(resultadoEsperado, resultado.Nombre);
        }

        [TestMethod]
        public void AgregarColaboradores()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);
            var lista = new List<EstudianteTablero>();

            contexto.TipoTableros.Add(new TipoTablero() { Nombre = "Académico" });
            contexto.SaveChanges();

            var tablero = new Tablero()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                Nombre = "Nuevo Tablero",
                Tipo = "Académico",
                Descripcion = "Este es un nuevo tablero de prueba",
                FechaCreacion = DateTime.Now
            };
            contexto.Tableros.Add(tablero);
            contexto.SaveChanges();

            var colaborador1 = new EstudianteTablero()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Nuevo Tablero",
                CorreoColaborador = "kevinar51@estudiantec.cr"
            };

            var colaborador2 = new EstudianteTablero()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Nuevo Tablero",
                CorreoColaborador = "oscar.araya@estudiantec.cr"
            };

            lista.Add(colaborador1);
            lista.Add(colaborador2);

            //prueba
            var repo = new TableroRepo(contexto);
            repo.AgregarColaboradores(lista);
            repo.SaveChanges();
            var resultadoEsperado1 = "kevinar51@estudiantec.cr";
            var resultadoEsperado2 = "oscar.araya@estudiantec.cr";

            var resultado1 = contexto.EstudianteTableros.Find("sam.astua@estudiantec.cr",
                "Nuevo Tablero", "kevinar51@estudiantec.cr");

            var resultado2 = contexto.EstudianteTableros.Find("sam.astua@estudiantec.cr",
                "Nuevo Tablero", "oscar.araya@estudiantec.cr");

            //verificación
            Assert.AreEqual(resultadoEsperado1, resultado1.CorreoColaborador);
            Assert.AreEqual(resultadoEsperado2, resultado2.CorreoColaborador);
        }

        [TestMethod]
        public void AgregarObservador()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);
            var lista = new List<TableroProfesor>();

            contexto.TipoTableros.Add(new TipoTablero() { Nombre = "Académico" });
            contexto.SaveChanges();

            var tablero = new Tablero()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                Nombre = "Nuevo Tablero",
                Tipo = "Académico",
                Descripcion = "Este es un nuevo tablero de prueba",
                FechaCreacion = DateTime.Now
            };
            contexto.Tableros.Add(tablero);
            contexto.SaveChanges();

            var observador1 = new TableroProfesor()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Nuevo Tablero",
                CorreoProfesor = "alfredo@profextec.cr"
            };

            var observador2 = new TableroProfesor()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Nuevo Tablero",
                CorreoProfesor = "luisB@profextec.cr"
            };

            lista.Add(observador1);
            lista.Add(observador2);

            //prueba
            var repo = new TableroRepo(contexto);
            repo.AgregarObservadores(lista);
            repo.SaveChanges();
            var resultadoEsperado1 = "alfredo@profextec.cr";
            var resultadoEsperado2 = "luisB@profextec.cr";

            var resultado1 = contexto.TableroProfesors.Find("sam.astua@estudiantec.cr",
                "Nuevo Tablero", "alfredo@profextec.cr");

            var resultado2 = contexto.TableroProfesors.Find("sam.astua@estudiantec.cr",
                "Nuevo Tablero", "luisB@profextec.cr");

            //verificación
            Assert.AreEqual(resultadoEsperado1, resultado1.CorreoProfesor);
            Assert.AreEqual(resultadoEsperado2, resultado2.CorreoProfesor);
        }

        [TestMethod]
        public void AccederMisTableros()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.getMisTableros("sam.astua@estudiantec.cr");

            //verificacion
            Assert.AreEqual(typeof(List<MisTablerosView>), resultado.GetType());
        }

        [TestMethod]
        public void AccederTablerosEnLosQueColaboro()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.getTablerosColaborador("sam.astua@estudiantec.cr");

            //verificacion
            Assert.AreEqual(typeof(List<MisTablerosView>), resultado.GetType());
        }

        [TestMethod]
        public void AccederInformacionDeTablero()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.getInfoTablero("sam.astua@estudiantec.cr", "Tablero 1");

            //verificacion
            Assert.AreEqual(typeof(TableroInfoDTO), resultado.GetType());
        }

        [TestMethod]
        public void AccederVisualizadoresTablero()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.GetVisualizadores("sam.astua@estudiantec.cr", "Tablero 1");

            //verificacion
            Assert.AreEqual(typeof(List<ColaboradoresView>), resultado.GetType());
        }

        [TestMethod]
        public void AccederTiposDeTablero()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);
            contexto.TipoTableros.Add(new TipoTablero() { Nombre = "Nuevo tipo" });
            contexto.SaveChanges();

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.GetTipos();

            //verificación
            Assert.AreEqual(1, resultado.Count);
        }

        [TestMethod]
        public void AccederEstadosConTareas()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.GetEstadosConTarea("sam.astua@estudiantec.cr", "Tablero 1");

            //verificacion
            Assert.AreEqual(typeof(List<EstadoDTO>), resultado.GetType());
        }

        [TestMethod]
        public void AccederAmigosColaboradores()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.GetAmigosColaboradores("sam.astua@estudiantec.cr", "Tablero 1");

            //verificacion
            Assert.AreEqual(typeof(List<ColaboradorAmigoDTO>), resultado.GetType());
        }

        [TestMethod]
        public void AccederProfesoresYvisualizadores()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.GetProfesoresYvisualizadores("sam.astua@estudiantec.cr", "Tablero 1");

            //verificacion
            Assert.AreEqual(typeof(List<ProfesorVisualizadorDTO>), resultado.GetType());
        }

        [TestMethod]
        public void generarRutaCritica()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.rutaCritica("sam.astua@estudiantec.cr", "Tablero 1");

            //verificacion
            Assert.AreEqual(typeof(Ruta), resultado.GetType());
        }

        [TestMethod]
        public void generarTareasParaAlgoritmo()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();
            var contexto = ConstruirContext(nombre);

            //prueba
            var repo = new TableroRepo(contexto);
            var resultado = repo.generarTareasParaAlgoritmo(new List<TareaCPMView>());

            //verificacion
            Assert.AreEqual(typeof(List<TareaCPM>), resultado.GetType());
        }
    }
}
