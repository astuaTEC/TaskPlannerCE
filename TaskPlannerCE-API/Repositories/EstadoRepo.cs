using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.InObjects;

namespace TaskPlannerCE_API.Repositories
{
    public class EstadoRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public EstadoRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Metodo para cambiarle el nombre a un estado
        /// </summary>
        /// <param name="ei">El objeto estado a actualizar</param>
        public void actualizarNombreEstado(EstadoIn ei)
        {
            _context.Database.ExecuteSqlRaw("spActualizarNombreEstado @p0, @p1, @p2, @p3",
                ei.correoEstudiante, ei.nombreTablero, ei.nombre, ei.idEstado);
        }

        public void EliminarEstado(int id, string correo, string nombreTablero)
        {
            _context.Database.ExecuteSqlRaw("spEliminarEstado @p0, @p1, @p2",
                id, correo, nombreTablero);
        }
    }
}
