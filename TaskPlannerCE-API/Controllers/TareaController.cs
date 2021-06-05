using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.InObjects;
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

        [HttpGet]
        [Route("api/tarea/infoTarea")]
        public IActionResult GetInfoTarea([FromQuery] string correo, [FromQuery] string nombreTablero,
            [FromQuery] string nombreTarea)
        {
            var resultado = _repo.GetInfoTarea(correo, nombreTablero, nombreTarea);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpPost]
        [Route("api/tarea/actualizarEstado")]
        public IActionResult ActualizarEstado([FromBody] TareaEstadoIn te)
        {
            _repo.actualizarEstado(te);
            return Ok("Estado actualizado correctamente");
        }

        [HttpPost]
        [Route("api/tarea/agregarDependencias")]
        public IActionResult AgregarDependencias([FromBody] List<TareaDependencium> ltd)
        {
            _repo.AgregarDependencia(ltd);
            _repo.SaveChanges();
            return Ok("Dependencias agregadas correctamente");
        }

        [HttpDelete]
        [Route("api/tarea/eliminarDependencia")]
        public IActionResult EliminarDependencia([FromQuery] string correo, string nombreTablero,
            string nombreTarea, string nombreTareaD)
        {
            try
            {
                _repo.EliminarDependencia(correo, nombreTablero, nombreTarea, nombreTareaD);
                return Ok("Dependencia eliminada correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }

    }
}
