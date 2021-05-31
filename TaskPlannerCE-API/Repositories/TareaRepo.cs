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
        public TareaInfoDTO GetInfoTarea(string correo, string nombreTablero, string nombreTarea, string estado)
        {
            var colaboradores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetResponsablesTarea " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}, @nombreTarea = {nombreTarea}," +
                            $"@estado = {estado}").ToList();

            var dependencias = _context.Set<TareaSimpleView>().FromSqlRaw($"EXEC spGetDependenciasTarea " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}, @nombreTarea = {nombreTarea}," +
                            $"@estado = {estado}").ToList();

            var tareaInfo = new TareaInfoDTO
            {
                nombreTarea = nombreTarea
            };

            foreach (var dependencia in dependencias)
            {
                tareaInfo.dependencias.Add(dependencia);
            }

            foreach (var colaborador in colaboradores)
            {
                tareaInfo.colaboradores.Add(colaborador);
            }

            return tareaInfo;
        }
    }
}
