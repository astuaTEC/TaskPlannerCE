using DATIC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATIC_API.Repositories
{
    public class EstudianteRepo
    {
        private readonly DATICContext _context;

        // Inject the Data Base Context
        public EstudianteRepo(DATICContext context)
        {
            _context = context;
        }
        public Estudiante GetEstudiante(string correoInstitucional, string carnet)
        {
            return _context.Estudiantes.Where(x => x.CorreoInstitucional == correoInstitucional
            && x.CarnetInstitucional == carnet).FirstOrDefault();
        }

        public Estudiante GetEstudiante(string correoInstitucional)
        {
            return _context.Estudiantes.Where(x => x.CorreoInstitucional == correoInstitucional).FirstOrDefault();
        }
    }
}
