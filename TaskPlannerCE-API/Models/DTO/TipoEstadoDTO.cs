using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskPlannerCE_API.Models.DTO
{
    public class TipoEstadoDTO
    {
        public TipoEstadoDTO()
        {
            estados = new List<EstadoAsociadoDTO>();
        }

        public string nombre { get; set; }
        public List<EstadoAsociadoDTO> estados { get; set; }
    }
}
