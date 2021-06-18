using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.Views
{
    public class SolicitudView
    {
        public string correoEmisor { get; set; }
        public string correoReceptor { get; set; }
        public string estado { get; set; }

        public string nombre { get; set; }
    }
}
