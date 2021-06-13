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
            foreach(var t in listaTareas)
            {
                // por cada dependencia se crea una nueva ruta
                foreach(var d in t.dependencias)
                {
                    var ruta = new Ruta();
                    ruta.ruta.Add(t); // se agrega la tarea inicial
                    ruta.duracion += t.dur;
                    generarRuta(d, ruta);
                }
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
        /// Metodo para ir generando rutas dependiendo de las dependencias de cada tarea
        /// </summary>
        /// <param name="tarea">La tarea a revisar</param>
        /// <param name="ruta">La ruta que se tiene en el momento</param>
        public void generarRuta(TareaCPM tarea, Ruta ruta)
        {
            // se le agrega la duracion de la tarea a la ruta
            ruta.duracion += tarea.dur;
            if (tarea.dependencias.Count == 0) // si no hay dependencias, la ruta ya termina
                rutas.Add(ruta);
            else
            {
                // por cada dependencia se genera una ruta
                foreach(var t in tarea.dependencias)
                {
                    // se copian  los elementos
                    var nuevaRuta = new Ruta();
                    nuevaRuta.duracion += ruta.duracion; // se agrega la duración de la ruta que se lleva al momento
                    foreach (var ele in ruta.ruta) // se copia la ruta que se lleva hasta el momento
                    {
                        nuevaRuta.ruta.Add(ele);
                    }
                    generarRuta(t, nuevaRuta); // se vuelve a llamar el método recursivamente
                }
            }
        }
        
    }
}
