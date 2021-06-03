using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models.Views;

namespace TaskPlannerCE_API.Models.DTO
{
    public class EstadoDTO
    {

        public EstadoDTO()
        {
            tareas = new List<TareaView>();
        }

        public string nombre { get; set; }
        public int id { get; set; }
        public List<TareaView> tareas { get; set; }

    }
}
