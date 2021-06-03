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
        }

        public string Nombre { get; set; }

        public virtual ICollection<Tablero> Tableros { get; set; }
    }
}
