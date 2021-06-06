using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class Notificacion
    {
        public int Id { get; set; }
        public string CorreoEstudiante { get; set; }
        public string Descripcion { get; set; }
        public DateTime? Fecha { get; set; }

        public virtual Estudiante CorreoEstudianteNavigation { get; set; }
    }
}
