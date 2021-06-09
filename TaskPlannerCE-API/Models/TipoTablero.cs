using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class TipoTablero
    {
        public TipoTablero()
        {
            Tableros = new HashSet<Tablero>();
            TipoTableroEstados = new HashSet<TipoTableroEstado>();
        }

        public string Nombre { get; set; }

        public virtual ICollection<Tablero> Tableros { get; set; }
        public virtual ICollection<TipoTableroEstado> TipoTableroEstados { get; set; }
    }
}
