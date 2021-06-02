using DATIC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATIC_API.Repositories
{
    public class ProfesorRepo
    {
        private readonly DATICContext _context;

        // Inject the Data Base Context
        public ProfesorRepo(DATICContext context)
        {
            _context = context;
        }

        public Profesor GetProfesor(string correoInstitucional, string cedula)
        {
            return _context.Profesors.Where(x => x.CorreoInstitucional == correoInstitucional
            && x.Cedula == cedula).FirstOrDefault();
        }
    }
}
