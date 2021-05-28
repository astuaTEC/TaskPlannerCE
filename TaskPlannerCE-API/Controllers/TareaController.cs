using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Repositories;

namespace TaskPlannerCE_API.Controllers
{
    [ApiController]
    public class TareaController : Controller
    {
        private readonly TareaRepo _repo;

        // se inyecta el repositorio correspondiente
        public TareaController(TareaRepo repo)
        {
            _repo = repo;
        }
    }
}
