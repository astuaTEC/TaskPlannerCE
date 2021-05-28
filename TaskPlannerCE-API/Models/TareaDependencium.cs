using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class TareaDependencium
    {
        public string CorreoEstudiante { get; set; }
        public string NombreTablero { get; set; }
        public string NombreEstado { get; set; }
        public string NombreTarea { get; set; }
        public string NombreTareaDependiente { get; set; }

        public virtual Tarea Tarea { get; set; }
    }
}
