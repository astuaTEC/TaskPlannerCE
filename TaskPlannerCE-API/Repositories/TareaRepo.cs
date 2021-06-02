using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.DTO;
using TaskPlannerCE_API.Models.Views;

namespace TaskPlannerCE_API.Repositories
{
    public class TareaRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public TareaRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Metodo para acceder a los responsables y dependencias de una tarea específica
        /// </summary>
        /// <param name="correo">correo del creador del tablero</param>
        /// <param name="nombreTablero">nombre del tablero donde se encuantra la tarea</param>
        /// <param name="nombreTarea">nombre de la tarea a consultar</param>
        /// <param name="estado">estado al que pertenece esa tarea</param>
        /// <returns>un objeto con la información de la tarea</returns>
        public TareaInfoDTO GetInfoTarea(string correo, string nombreTablero, string nombreTarea)
        {
            var responsables = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetResponsablesTarea " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}, @nombreTarea = {nombreTarea}").ToList();

            var dependencias = _context.Set<TareaSimpleView>().FromSqlRaw($"EXEC spGetDependenciasTarea " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}, @nombreTarea = {nombreTarea}").ToList();

            var tareasTotales = _context.Set<TareaSimpleView>().FromSqlRaw($"EXEC spGetTareasTableroSinEstado " +
                            $"@correo = {correo}, @nombre = {nombreTablero}, @nombreTarea = {nombreTarea}").ToList();

            var colaboradores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetColaboradoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();

            var tareaInfo = new TareaInfoDTO
            {
                nombreTarea = nombreTarea
            };

            foreach(var tarea in tareasTotales)
            {
                var tareaDependencia = new TareaDependenciaDTO
                {
                    nombreTarea = tarea.nombreTarea
                };

                if (verificarDependencia(tarea.nombreTarea, dependencias))
                    tareaDependencia.dependencia = true;
                else
                    tareaDependencia.dependencia = false;

                tareaInfo.dependencias.Add(tareaDependencia);
            }

            foreach(var colaborador in colaboradores)
            {
                var colaboradorEncargado = new ColaboradorEncargadoDTO
                {
                    nombre = colaborador.nombre,
                    correoInstitucional = colaborador.correoInstitucional
                };

                if (verificarResponsable(colaborador.nombre, responsables))
                    colaboradorEncargado.encargado = true;
                else
                    colaboradorEncargado.encargado = false;

                tareaInfo.encargados.Add(colaboradorEncargado);
            }

            return tareaInfo;
        }

        public bool verificarResponsable(string nombre, List<ColaboradoresView> responsables)
        {
            foreach(var responsable in responsables)
            {
                if(nombre == responsable.nombre)
                {
                    return true;
                }

            }
            return false;
        }

        public bool verificarDependencia(string nombre, List<TareaSimpleView> dependencias)
        {
            foreach(var dependencia in dependencias)
            {
                if(nombre == dependencia.nombreTarea)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
