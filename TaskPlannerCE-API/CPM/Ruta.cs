using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.CPM
{
    public class Ruta
    {
        public Ruta()
        {
            this.ruta = new List<TareaCPM>();
        }
        public int duracion { get; set; }
        public List<TareaCPM> ruta { get; set; }
    }
}
