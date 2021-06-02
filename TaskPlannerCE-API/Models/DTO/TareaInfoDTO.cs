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
            encargados = new List<ColaboradorEncargadoDTO>();
            dependencias = new List<TareaDependenciaDTO>();
        }

        public string nombreTarea { get; set; }
        public List<ColaboradorEncargadoDTO> encargados { get; set; }
        public List<TareaDependenciaDTO> dependencias { get; set; }
    }
}
