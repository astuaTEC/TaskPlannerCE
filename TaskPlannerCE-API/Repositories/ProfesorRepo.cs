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
        /// Metodo para acceder a la información del perfil de un profesor
        /// </summary>
        /// <param name="correoInstitucional">El correo del profesor a consultar</param>
        /// <returns>El profesor con su información</returns>
        public Profesor GetMiInfo(string correoInstitucional)
        {
            return _context.Profesors.Where(x => x.CorreoInstitucional == correoInstitucional).FirstOrDefault();
        }

        /// <summary>
        /// Metodo para acceder a todos los profesores del sistema
        /// </summary>
        /// <returns>la lista de profesores correspondiente</returns>
        public List<ColaboradoresView> getTodosProfes()
        {
            return _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetTodosProfes").ToList();
        }

        /// <summary>
        /// Metodo para actualizar un profesor específico
        /// </summary>
        /// <param name="profesor">El profesor a actualizar</param>
        public void ActualizarProfesor(Profesor profesor)
        {
            if (profesor == null)
                throw new ArgumentNullException(nameof(profesor));

            _context.Profesors.Update(profesor);
        }


        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
