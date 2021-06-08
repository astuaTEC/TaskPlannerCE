using DATIC_API.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATIC_API.Controllers
{
    [ApiController]
    public class ProfesorController : Controller
    {
        private readonly ProfesorRepo _repo;

        // se inyecta el repositorio correspondiente
        public ProfesorController(ProfesorRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/datic/profesor")]
        public IActionResult GetProfesor([FromQuery] string correo, [FromQuery] string cedula)
        {
            var resultado = _repo.GetProfesor(correo, cedula);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/datic/profesorSinCedula")]
        public IActionResult GetProfesor([FromQuery] string correo)
        {
            var resultado = _repo.GetProfesor(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
