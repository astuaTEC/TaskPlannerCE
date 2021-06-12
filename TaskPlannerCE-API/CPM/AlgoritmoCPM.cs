using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.CPM
{
    public class AlgoritmoCPM
    {
        List<Ruta> rutas;

        public AlgoritmoCPM()
        {
            rutas = new List<Ruta>();
        }
        public Ruta ejecutarAlgoritmo(List<TareaCPM> listaTareas)
        {

            foreach(var t in listaTareas)
            {
                
                foreach(var d in t.dependencias)
                {
                    var ruta = new Ruta();
                    ruta.ruta.Add(t);
                    ruta.duracion += t.dur;
                    generarRuta(d, ruta);
                }
            }

            if (rutas.Count == 0)
                return new Ruta();

            var tmp = rutas.First();
            foreach(var r in rutas)
            {
                if (r.duracion > tmp.duracion)
                    tmp = r;
            }

            return tmp;
        }

        public void generarRuta(TareaCPM tarea, Ruta ruta)
        {
            ruta.duracion += tarea.dur;
            if (tarea.dependencias.Count == 0)
                rutas.Add(ruta);
            else
            {
                foreach(var t in tarea.dependencias)
                {
                    // se copian  los elementos
                    var nuevaRuta = new Ruta();
                    nuevaRuta.duracion += ruta.duracion;
                    foreach (var ele in ruta.ruta)
                    {
                        nuevaRuta.ruta.Add(ele);
                    }
                    generarRuta(t, nuevaRuta);
                }
            }
        }
        
    }
}
