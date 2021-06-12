using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.Views
{
    public class TareaCPMView
    {
        public string nombre { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFinalizacion { get; set; }
        public string dependencia { get; set; }
    }
}
