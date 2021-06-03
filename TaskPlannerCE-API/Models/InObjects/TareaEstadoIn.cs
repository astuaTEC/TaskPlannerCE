using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.InObjects
{
    public class TareaEstadoIn
    {
        public string correoEstudiante { get; set; }
        public string nombreTablero { get; set; }
        public int idEstado { get; set; }
        public string nombreTarea { get; set; }
    }
}
