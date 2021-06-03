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
        public IActionResult ActualizarEstado([FromBody] EstadoIn ei)
        {
            _repo.actualizarNombreEstado(ei);
            return Ok("Estado actualizado correctamente");
        }
    }
}
