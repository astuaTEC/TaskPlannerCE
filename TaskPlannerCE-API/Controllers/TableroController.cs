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
    }
}
