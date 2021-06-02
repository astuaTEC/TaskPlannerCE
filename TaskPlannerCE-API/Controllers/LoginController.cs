using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models.DaticModels;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCE_API.Controllers
{
    [ApiController]
    public class LoginController : Controller
    {

        private readonly LoginRepo _repo;

        // se inyecta el repositorio correspondiente
        public LoginController(LoginRepo repo)
        {
            _repo = repo;
        }


        [HttpPost]
        [Route("api/taskplanner/login")]
        public IActionResult Login([FromBody] Login login)
        {
            var resultado = _repo.verificarLogin(login);

            if (resultado == null)
                return BadRequest("Carnet o contaseña incorrectos");
            return Ok(resultado);
        }
    }
}
