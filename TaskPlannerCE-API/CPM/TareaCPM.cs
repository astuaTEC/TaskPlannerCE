using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.CPM
{
    public class TareaCPM
    {
        public TareaCPM()
        {
            this.dependencias = new List<TareaCPM>();
        }

        public TareaCPM(string nombre, int dur, DateTime fechaI, DateTime fechaF)
        {
            this.nombre = nombre;
            this.dur = dur;
            this.fechaInicio = fechaI;
            this.fechaFinalizacion = fechaF;
            this.dependencias = new List<TareaCPM>();
        }
        public string nombre { get; set; }

        public int dur;

        public DateTime fechaInicio { get; set; }
        public DateTime fechaFinalizacion { get; set; }

        public List<TareaCPM> dependencias { get; set; }
    }
}
