using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class TableroProfesor
    {
        public string CorreoEstudiante { get; set; }
        public string NombreTablero { get; set; }
        public string CorreoProfesor { get; set; }

        public virtual Profesor CorreoProfesorNavigation { get; set; }
        public virtual Tablero Tablero { get; set; }
    }
}
