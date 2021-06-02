using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCE_API.Controllers
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
        [Route("api/profesor/getTodos")]
        public IActionResult GetTodosProfes()
        {
            var resultado = _repo.getTodosProfes();
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
