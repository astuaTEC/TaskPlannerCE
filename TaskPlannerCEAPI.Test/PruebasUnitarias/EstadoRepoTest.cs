using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCEAPI.Test.PruebasUnitarias
{
    [TestClass]
    public class EstadoRepoTest: BasePruebas
    {
        [TestMethod]
        public void crearEstado()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            contexto.Tableros.Add(new Tablero()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                Nombre = "Tablero 1",
            });
            contexto.SaveChanges();

            var estado = new Estado()
            {
                CorreoEstudiante = "sam.astua@estudiantec.cr",
                NombreTablero = "Tablero 1",
                Nombre = "Nuevo Estado"
            };

            //prueba
            var repo = new EstadoRepo(contexto);
            string nombreEsperado = "Nuevo Estado";
            repo.CrearEstado(estado);
            repo.SaveChanges();
            var resultado = contexto.Estados.Find("sam.astua@estudiantec.cr", "Tablero 1", 1);

            //validación
            Assert.AreEqual(nombreEsperado, resultado.Nombre);
        }

        [TestMethod]
        public void AgregarEstadosAtipoAsync()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);
            contexto.TipoTableros.Add(new TipoTablero() { Nombre = "Académico" });
            contexto.SaveChanges();

            var tipo1 = new TipoTableroEstado()
            {
                NombreEstado = "Estado A",
                NombreTipo = "Académico"
            };
            var tipo2 = new TipoTableroEstado()
            {
                NombreEstado = "Estado B",
                NombreTipo = "Académico"
            };

            var lista = new List<TipoTableroEstado>();
            lista.Add(tipo1);
            lista.Add(tipo2);
            var resultadoEsperado1 = "Estado A";
            var resultadoEsperado2 = "Estado B";

            // prueba
            var repo = new EstadoRepo(contexto);
            repo.AgregarEstadosAtipo(lista);
            repo.SaveChanges();
            var resultado1 = contexto.TipoTableroEstados.Find("Académico", "Estado A");
            var resultado2 = contexto.TipoTableroEstados.Find("Académico", "Estado B");

            //verificación
            Assert.AreEqual(resultadoEsperado1, resultado1.NombreEstado);
            Assert.AreEqual(resultadoEsperado2, resultado2.NombreEstado);
        }
    }
}
