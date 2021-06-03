using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.Views
{
    public class TareaView
    {
        public string nombreEstado { get; set; }
        public string? nombreTarea { get; set; }

        public string descripcion { get; set; }
        public int idEstado { get; set; }
        public DateTime? fechaInicio { get; set; }
        public DateTime? fechaFinalizacion { get; set; }
    }
}
