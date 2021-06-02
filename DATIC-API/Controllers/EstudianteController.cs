using DATIC_API.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATIC_API.Controllers
{
    [ApiController]
    public class EstudianteController : Controller
    {
        private readonly EstudianteRepo _repo;

        // se inyecta el repositorio correspondiente
        public EstudianteController(EstudianteRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/datic/estudiante")]
        public IActionResult GetEstudiante([FromQuery] string correo, [FromQuery] string carnet)
        {
            var resultado = _repo.GetEstudiante(correo, carnet);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/datic/estudianteSinCarnet")]
        public IActionResult GetEstudianteSinCarnet([FromQuery] string correo)
        {
            var resultado = _repo.GetEstudiante(correo);
            if (resultado == null)
                return BadRequest();
            return Ok(resultado);
        }
    }
}
