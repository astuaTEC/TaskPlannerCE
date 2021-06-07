using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
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
        [Route("api/estudiante/getTodos")]
        public IActionResult GetTodosEstudiantes([FromQuery] string correo)
        {
            var resultado = _repo.getTodosEstudiantes(correo);
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

        /*[HttpGet]
        [Route("api/estudiante/buscarAmigo")]
        public IActionResult BuscarAmigo([FromQuery] string correo, [FromQuery] string variable)
        {
            var resultado = _repo.buscarAmigo(correo, variable);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }*/

        /* [HttpGet]
         [Route("api/estudiante/buscarEstudiante")]
         public IActionResult BuscarEstudiantes([FromQuery] string correo, [FromQuery] string variable)
         {
             var resultado = _repo.buscarEstudiantes(correo, variable);
             if (resultado == null)
                 return BadRequest("Ha ocurrido un error");
             return Ok(resultado);
         }*/

        [HttpGet]
        [Route("api/estudiante/misSolicitudes")]
        public IActionResult GetMisSolicitudes([FromQuery] string correo)
        {
            var resultado = _repo.GetMisSolicitudes(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpPost]
        [Route("api/estudiante/enviarSolicitud")]
        public IActionResult EnviarSolicitud([FromBody] Solicitud solicitud)
        {
            try
            {
                _repo.EnviarSolicitudAmistad(solicitud);
                _repo.SaveChanges();
                return Ok("Solicitud enviada correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }

        [HttpPost]
        [Route("api/estudiante/aceptarRechazarSolicitud")]
        public IActionResult AceptarRechazarSolicitud([FromBody] Solicitud solicitud)
        {
            try
            {
                if(solicitud.Estado == "Aceptado")
                    _repo.AceptarSolicitud(solicitud.CorreoEmisor, solicitud.CorreoReceptor);
                else if(solicitud.Estado == "Rechazado")
                    _repo.RechazarSolicitud(solicitud.CorreoEmisor, solicitud.CorreoReceptor);

                return Ok("Solicitud aceptada/rechazada correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }

        [HttpDelete]
        [Route("api/estudiante/eliminarAmigo")]
        public IActionResult EliminarAmigo([FromQuery] string correo, string correoA)
        {
            try
            {
                _repo.EliminarAmigo(correo, correoA);
                return Ok("Amigo eliminado correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }
    }
}
