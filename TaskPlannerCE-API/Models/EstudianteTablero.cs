using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class EstudianteTablero
    {
        public string CorreoEstudiante { get; set; }
        public string NombreTablero { get; set; }
        public string CorreoColaborador { get; set; }

        public virtual Estudiante CorreoColaboradorNavigation { get; set; }
        public virtual Tablero Tablero { get; set; }
    }
}
