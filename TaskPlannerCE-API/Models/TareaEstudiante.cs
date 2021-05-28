using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class TareaEstudiante
    {
        public string CorreoEstudiante { get; set; }
        public string NombreTablero { get; set; }
        public string NombreEstado { get; set; }
        public string NombreTarea { get; set; }
        public string CorreoResponsable { get; set; }

        public virtual Estudiante CorreoResponsableNavigation { get; set; }
        public virtual Tarea Tarea { get; set; }
    }
}
