using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class Estado
    {
        public Estado()
        {
            Tareas = new HashSet<Tarea>();
        }

        public int Id { get; set; }
        public string CorreoEstudiante { get; set; }
        public string NombreTablero { get; set; }
        public string Nombre { get; set; }

        public virtual Tablero Tablero { get; set; }
        public virtual ICollection<Tarea> Tareas { get; set; }
    }
}
