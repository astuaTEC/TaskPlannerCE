using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.DaticModels
{
    public class LoginReturn
    {
        public string correoIstitucional { get; set; }
        public bool estudiante { get; set; }
        public bool profesor { get; set; }
        public bool admin { get; set; }
    }
}
