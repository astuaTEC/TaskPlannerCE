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
        [Route("api/estudiante/get")]
        public IActionResult Get()
        {
            
            return Ok(_repo.getAlgo());
        }
    }
}
