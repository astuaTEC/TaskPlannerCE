using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models.InObjects;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCE_API.Controllers
{
    [ApiController]
    public class EstadoController : Controller
    {
        private readonly EstadoRepo _repo;

        // se inyecta el repositorio correspondiente
        public EstadoController(EstadoRepo repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("api/estado/actualizarNombre")]
        public IActionResult ActualizarNombre([FromBody] EstadoIn ei)
        {
            _repo.actualizarNombreEstado(ei);
            return Ok("Estado actualizado correctamente");
        }


        [HttpDelete]
        [Route("api/estado/eliminar")]
        public IActionResult EliminarEstado([FromQuery] string correo, string nombreTablero, int id)
        {
            try
            {
                _repo.EliminarEstado(id, correo, nombreTablero);
                return Ok("Estado eliminado correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }

    }
}
