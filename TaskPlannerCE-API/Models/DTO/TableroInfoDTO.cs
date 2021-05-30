using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models.Views;

namespace TaskPlannerCE_API.Models.DTO
{
    public class TableroInfoDTO
    {
        public TableroInfoDTO()
        {
            colaboradores = new List<ColaboradoresView>();
            visualizadores = new List<ColaboradoresView>();
        }

        public string nombreTablero { get; set; }
        public List<ColaboradoresView> colaboradores { get; set; }
        public List<ColaboradoresView> visualizadores { get; set; }
    }
}
