using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class Solicitud
    {
        public string CorreoEmisor { get; set; }
        public string CorreoReceptor { get; set; }
        public string Estado { get; set; }

        public virtual Estudiante CorreoEmisorNavigation { get; set; }
        public virtual Estudiante CorreoReceptorNavigation { get; set; }
    }
}
