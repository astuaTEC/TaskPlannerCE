using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;

namespace TaskPlannerCE_API.Repositories
{
    public class EstudianteRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public EstudianteRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

        public String getAlgo()
        {
            return "Hola desde el repositorio de estudiante";
        }
    }
}
