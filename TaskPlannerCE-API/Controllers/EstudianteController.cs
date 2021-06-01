using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCE_API.Controllers
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
        [Route("api/estudiante/getMiInfo")]
        public IActionResult GetMiInfo([FromQuery] string correo)
        {
            var resultado = _repo.GetMiInfo(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/misAmigos")]
        public IActionResult GetMisAmigos([FromQuery] string correo)
        {
            var resultado = _repo.getMisAmigos(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/estudiantesNoAmigos")]
        public IActionResult GetEstudiantesNoAmigos([FromQuery] string correo)
        {
            var resultado = _repo.getEstudiantesNoAmigos(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/buscarAmigo")]
        public IActionResult BuscarAmigo([FromQuery] string correo, [FromQuery] string variable)
        {
            var resultado = _repo.buscarAmigo(correo, variable);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/buscarEstudiante")]
        public IActionResult BuscarEstudiantes([FromQuery] string correo, [FromQuery] string variable)
        {
            var resultado = _repo.buscarEstudiantes(correo, variable);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
