using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCEAPI.Test.PruebasUnitarias
{
    [TestClass]
    public class ProfesorRepoTest: BasePruebas
    {
        [TestMethod]
        public void AccederATodosLosProfesores()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);


            //prueba
            var repo = new ProfesorRepo(contexto);

            var resultado = repo.getTodosProfes();


            //verificacion

            Assert.AreEqual(0, resultado.Count);
        }

        [TestMethod]
        public void actualizarProfesorExito()
        {
            //preparación
            var nombre = Guid.NewGuid().ToString();

            var contexto = ConstruirContext(nombre);

            var profe = new Profesor()
            {
                Carnet = "3333344444",
                CorreoInstitucional = "alfredo@profextec.cr",
                PrimerNombre = "Alfredito",
                SegundoNombre = "",
                PrimerApellido = "Cruz",
                SegundoApellido = "Rodríguez",
                Telefono = "+50688886666"
            };
            contexto.Profesors.Add(profe);
            contexto.SaveChanges();

            //prueba
            var repo = new ProfesorRepo(contexto);
            var nombreEsperado = "Nuevo segundoNombre";
            profe.SegundoNombre = "Nuevo segundoNombre";
            repo.ActualizarProfesor(profe);
            repo.SaveChanges();
            var resultado = contexto.Profesors.Find("alfredo@profextec.cr");

            //verificacion
            Assert.AreEqual(nombreEsperado, resultado.SegundoNombre);

        }
    }
}
