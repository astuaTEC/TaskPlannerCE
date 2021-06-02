using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.DTO
{
    public class TareaDependenciaDTO
    {
        public string nombreTarea { get; set; }
        public bool dependencia { get; set; }
    }
}
