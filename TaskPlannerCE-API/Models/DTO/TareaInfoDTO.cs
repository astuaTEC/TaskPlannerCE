using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models.Views;

namespace TaskPlannerCE_API.Models.DTO
{
    public class TareaInfoDTO
    {
        public TareaInfoDTO()
        {
            responsables = new List<ColaboradoresView>();
            dependencias = new List<TareaSimpleView>();
        }

        public string nombreTarea { get; set; }
        public List<ColaboradoresView> responsables { get; set; }
        public List<TareaSimpleView> dependencias { get; set; }
    }
}
