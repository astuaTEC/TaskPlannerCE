using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.DTO
{
    public class BuscarEstudiantesDTO
    {
        public string correoInstitucional { get; set; }
        public string carnet { get; set; }
        public string nombre { get; set; }
        public bool amigo { get; set; }
    }
}
