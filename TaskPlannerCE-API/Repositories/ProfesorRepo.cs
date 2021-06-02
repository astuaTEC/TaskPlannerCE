using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.Views;

namespace TaskPlannerCE_API.Repositories
{
    public class ProfesorRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public ProfesorRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Metodo para acceder a todos los profesores del sistema
        /// </summary>
        /// <returns>la lista de profesores correspondiente</returns>
        public List<ColaboradoresView> getTodosProfes()
        {
            return _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetTodosProfes").ToList();
        }
        
    }
}
