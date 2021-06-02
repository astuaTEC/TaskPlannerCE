using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class Profesor
    {
        public Profesor()
        {
            TableroProfesors = new HashSet<TableroProfesor>();
        }

        public string Carnet { get; set; }
        public string CorreoInstitucional { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string Telefono { get; set; }
        public bool Administrador { get; set; }

        public virtual ICollection<TableroProfesor> TableroProfesors { get; set; }
    }
}
