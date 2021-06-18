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

        [HttpGet]
        [Route("api/estudiante/ultimosAmigos")]
        public IActionResult GetUltimosCincoAmigos([FromQuery] string correo)
        {
            var resultado = _repo.GetUltimosCincoAmigos(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/getNumeroTableros")]
        public IActionResult GetNumeroDeTableros([FromQuery] string correo)
        {
            var resultado = _repo.GetNumeroDeTableros(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/getTablerosPorMes")]
        public IActionResult GetTablerosPorMes([FromQuery] string correo)
        {
            var resultado = _repo.GetTablerosPorMes(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/misSolicitudes")]
        public IActionResult GetMisSolicitudes([FromQuery] string correo)
        {
            var resultado = _repo.GetMisSolicitudes(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/solicitudesPendientes")]
        public IActionResult GetSolicitudesPendientes([FromQuery] string correo)
        {
            var resultado = _repo.GetSolicitudesPendientes(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiante/notificaciones")]
        public IActionResult GetMisNotificaciones([FromQuery] string correo)
        {
            var resultado = _repo.GetNotificaciones(correo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }



        [HttpPut]
        [Route("api/estudiante/actualizar")]
        public IActionResult ActualizarEstudiante([FromBody] Estudiante estudiante)
        {
            try
            {
                _repo.ActualizarEstudiante(estudiante);
                _repo.SaveChanges();
                return Ok("Perfil actualizado correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
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

        [HttpDelete]
        [Route("api/estudiante/eliminar")]
        public IActionResult EliminarUsuario([FromQuery] string correo)
        {
            try
            {
                _repo.EliminarUsuario(correo);
                return Ok("Usuario eliminado correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }

        [HttpDelete]
        [Route("api/estudiante/eliminarNotificacion")]
        public IActionResult EliminarNotificacion([FromQuery] string correo, [FromQuery] int id)
        {
            try
            {
                _repo.eliminarNotificacion(correo, id);
                return Ok("Notificacion eliminada correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }
    }
}
