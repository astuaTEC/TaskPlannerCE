using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class Tarea
    {
        public Tarea()
        {
            TareaEstudiantes = new HashSet<TareaEstudiante>();
        }

        public string CorreoEstudiante { get; set; }
        public string NombreTablero { get; set; }
        public int IdEstado { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinalizacion { get; set; }

        public virtual Estado Estado { get; set; }
        public virtual TareaDependencium TareaDependencium { get; set; }
        public virtual ICollection<TareaEstudiante> TareaEstudiantes { get; set; }
    }
}
