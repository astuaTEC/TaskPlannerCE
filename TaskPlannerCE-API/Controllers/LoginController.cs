using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
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

        [HttpPost]
        [Route("api/taskplanner/registrarEstudiante")]
        public IActionResult RegistrarEstudiante([FromBody] Estudiante estudiante)
        {
            var resultado = _repo.RegistrarEstudiante(estudiante);

            if (resultado == true)
            {
                _repo.SaveChanges();
                return Ok("Estudiante registrado exitosaqmente");
            }
            else
                return BadRequest("No se ha podido registrar el estudiante");  
        }

        [HttpPost]
        [Route("api/taskplanner/registrarProfesor")]
        public IActionResult RegistrarProfesor([FromBody] Profesor profesor)
        {
            var resultado = _repo.RegistrarProfesor(profesor);

            if (resultado == true)
            {
                _repo.SaveChanges();
                return Ok("Profesor registrado exitosamente");
            }
            else
                return BadRequest("No se ha podido registrar el profesor");
        }

        [HttpPost]
        [Route("api/taskplanner/registrarAdmin")]
        public IActionResult RegistrarAdmin([FromBody] Administrador administrador)
        {
            var resultado = _repo.RegistrarAdmin(administrador);

            if (resultado == true)
            {
                _repo.SaveChanges();
                return Ok("Administrador registrado exitosamente");
            }
            else
                return BadRequest("No se ha podido registrar el administrador");

        }
    }
}
