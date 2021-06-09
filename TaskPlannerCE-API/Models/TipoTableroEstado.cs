using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class TipoTableroEstado
    {
        public string NombreTipo { get; set; }
        public string NombreEstado { get; set; }

        public virtual TipoTablero NombreTipoNavigation { get; set; }
    }
}
