using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class Tablero
    {
        public Tablero()
        {
            Estados = new HashSet<Estado>();
            TableroProfesors = new HashSet<TableroProfesor>();
        }

        public string CorreoEstudiante { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }

        public virtual Estudiante CorreoEstudianteNavigation { get; set; }
        public virtual EstudianteTablero EstudianteTablero { get; set; }
        public virtual ICollection<Estado> Estados { get; set; }
        public virtual ICollection<TableroProfesor> TableroProfesors { get; set; }
    }
}
