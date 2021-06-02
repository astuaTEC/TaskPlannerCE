using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.DTO
{
    public class ColaboradorEncargadoDTO
    {
        public string nombre { get; set; }
        public string correoInstitucional { get; set; }

        public bool encargado { get; set; }
    }
}
