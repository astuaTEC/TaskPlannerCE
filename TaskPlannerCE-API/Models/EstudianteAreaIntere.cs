using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class EstudianteAreaIntere
    {
        public string CarnetEstudiante { get; set; }
        public string AreaDeInteres { get; set; }

        public virtual Estudiante CarnetEstudianteNavigation { get; set; }
    }
}
