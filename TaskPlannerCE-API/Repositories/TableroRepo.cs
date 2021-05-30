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
    public class TableroRepo
    {

        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public TableroRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Metodo para acceder a los tableros creados por determinado estudiante
        /// </summary>
        /// <param name="miCorreo">el correo del estudiante que hace la consulta</param>
        /// <returns>la lista de tableros creados en caso de que tenga</returns>
        public List<MisTablerosView> getMisTableros(string miCorreo)
        {
            return _context.Set<MisTablerosView>().FromSqlRaw($"EXEC spGetmisTableros " +
                            $"@miCorreo = {miCorreo}").ToList();
        }

        /// <summary>
        /// Metodo para acceder a los tableros en los que un estudiante es colaborador
        /// </summary>
        /// <param name="miCorreo">el correo del estudiante a consultar</param>
        /// <returns>la lista de tableros en los que colabora el estudiante</returns>
        public List<MisTablerosView> getTablerosColaborador(string miCorreo)
        {
            return _context.Set<MisTablerosView>().FromSqlRaw($"EXEC spGetTablerosColaboro " +
                            $"@miCorreo = {miCorreo}").ToList();
        }

        /// <summary>
        /// Metodo para acceder a los colaboradores y visualizadores de un tablero específico
        /// </summary>
        /// <param name="correo">correo del propietario del tablero</param>
        /// <param name="nombreTablero">nombre del tablero a consultar</param>
        /// <returns>un objeto con los colaboradores y visualizadores</returns>
        public TableroInfoDTO getInfoTablero(string correo, string nombreTablero)
        {
            var colaboradores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetColaboradoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();

            var visualizadores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetVisualizadoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();

            var tableroInfo = new TableroInfoDTO
            {
                nombreTablero = nombreTablero
            };

            foreach(var visualizador in visualizadores)
            {
                tableroInfo.visualizadores.Add(visualizador);
            }
            
            foreach(var colaborador in colaboradores)
            {
                tableroInfo.colaboradores.Add(colaborador);
            }

            return tableroInfo;
        }

        /// <summary>
        /// Metodo para acceder a todas las tareas incluidas en un tablero. Se incluyen todos los estados existentes
        /// </summary>
        /// <param name="correo">correo del propietario del tablero</param>
        /// <param name="nombreTablero">nombre del tablero a consultar</param>
        /// <returns>una lista con todas las tareas existentes</returns>
        public List<TareaView> GetTareas(string correo, string nombreTablero)
        {
            return _context.Set<TareaView>().FromSqlRaw($"EXEC spGetTareasTablero " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}").ToList();
        }
    }
}
