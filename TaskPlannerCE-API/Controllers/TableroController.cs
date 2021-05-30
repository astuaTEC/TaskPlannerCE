using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCE_API.Controllers
{
    [ApiController]
    public class TableroController : Controller
    {
        private readonly TableroRepo _repo;

        // se inyecta el repositorio correspondiente
        public TableroController(TableroRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/tablero/misTableros")]
        public IActionResult GetMisTableros([FromQuery] string correo)
        {
            var resultado = _repo.getMisTableros(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/tablero/tablerosColaborador")]
        public IActionResult GetTablerosColaborador([FromQuery] string correo)
        {
            var resultado = _repo.getTablerosColaborador(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/tablero/infoTablero")]
        public IActionResult GetInfoTablero([FromQuery] string correo, [FromQuery] string nombre)
        {
            var resultado = _repo.getInfoTablero(correo, nombre);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
