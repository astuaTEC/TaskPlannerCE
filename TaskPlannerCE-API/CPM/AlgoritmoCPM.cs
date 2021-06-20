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

        /// <summary>
        /// Metodo que ejecuta el algoritmo de la ruta critica
        /// </summary>
        /// <param name="listaTareas">la lista de tareas disponibles para escoger la ruta crítica</param>
        /// <returns>La ruta crítica</returns>
        public Ruta ejecutarAlgoritmo(List<TareaCPM> listaTareas)
        {
            // Se recorre la lista de tareas
            foreach (var t in listaTareas)
            {
                var ruta = new Ruta();
                ruta.ruta.Add(t);
                ruta.duracion += t.dur;
                generarRuta(ruta, t.dependencias);
            }

            // si no hay rutas se retorna una ruta vacía
            if (rutas.Count == 0)
                return new Ruta();

            // se toma la primera ruta para compararla con las demás
            var tmp = rutas.First();
            foreach(var r in rutas)
            {
                if (r.duracion > tmp.duracion)
                    tmp = r;
            }

            // se retorna la ruta crítica
            return tmp;
        }

        /// <summary>
        /// Metodo para generar una ruta de dependencias
        /// </summary>
        /// <param name="ruta">La ruta que se quiere seguir</param>
        /// <param name="lista">La lista de dependencias de una tarea</param>
        public void generarRuta(Ruta ruta, List<TareaCPM> lista)
        {
            foreach(var d in lista)
            {
                ruta.duracion += d.dur;
                //ruta.ruta.Add(d);
            }
            rutas.Add(ruta);
        }
        
    }
}
