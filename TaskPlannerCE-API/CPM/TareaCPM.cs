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

        public TareaCPM(string nombre, int dur)
        {
            this.nombre = nombre;
            this.dur = dur;
            this.dependencias = new List<TareaCPM>();
        }
        public string nombre { get; set; }
        public int earlyStart { get; set; }

        public int earlyFinish { get; set; }

        public int latestStart { get; set; }

        public int latestFinish { get; set; }

        public int dur;

        public List<TareaCPM> dependencias { get; set; }
    }
}
