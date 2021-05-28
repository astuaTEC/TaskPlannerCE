using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class EstudianteAmigo
    {
        public string CorreoEstudiante { get; set; }
        public string CorreoAmigo { get; set; }

        public virtual Estudiante CorreoAmigoNavigation { get; set; }
        public virtual Estudiante CorreoEstudianteNavigation { get; set; }
    }
}
