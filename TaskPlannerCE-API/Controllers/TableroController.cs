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
        [Route("api/tablero/visualizadores")]
        public IActionResult GetVisualizadores([FromQuery] string correo, [FromQuery] string nombre)
        {
            var resultado = _repo.GetVisualizadores(correo, nombre);
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

        [HttpGet]
        [Route("api/tablero/amigosYcolaboradores")]
        public IActionResult GetAmigosYcolaboradores([FromQuery] string correo, [FromQuery] string nombre)
        {
            var resultado = _repo.GetAmigosColaboradores(correo, nombre);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/tablero/profesYvisualizadores")]
        public IActionResult GetProfesYvisualizadores([FromQuery] string correo, [FromQuery] string nombre)
        {
            var resultado = _repo.GetProfesoresYvisualizadores(correo, nombre);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/tablero/getEstadoConTareas")]
        public IActionResult GetTareas([FromQuery] string correo, [FromQuery] string nombre)
        {
            var resultado = _repo.GetEstadosConTarea(correo, nombre);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/tablero/tipos")]
        public IActionResult GetTipos()
        {
            var resultado = _repo.GetTipos();
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpPost]
        [Route("api/tablero/crearTipo")]
        public IActionResult CrearTipoTablero([FromBody] TipoTablero tipo)
        {
            try
            {
                _repo.CrearTipoTablero(tipo);
                _repo.SaveChanges();
                return Ok("Tipo de tablero creado correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }


        [HttpPost]
        [Route("api/tablero/crear")]
        public IActionResult CrearTablero([FromBody] Tablero tablero)
        {
            try
            {
                _repo.CrearTablero(tablero);
                _repo.SaveChanges();
                return Ok("Tablero creado correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }

        [HttpPost]
        [Route("api/tablero/agregarColaboradores")]
        public IActionResult AgregarColaboradores([FromBody] List<EstudianteTablero> listaET)
        {
            try
            {
                _repo.AgregarColaboradores(listaET);
                _repo.SaveChanges();
                return Ok("Colaboradores agregados correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }

        [HttpDelete]
        [Route("api/tablero/eliminarColaborador")]
        public IActionResult EliminarColaborador([FromQuery] string correo, string nombreTablero, string correoC)
        {
            try
            {
                _repo.EliminarColaborador(correo, nombreTablero, correoC);
                return Ok("Colaborador eliminado correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }

        [HttpDelete]
        [Route("api/tablero/eliminar")]
        public IActionResult EliminarTablero([FromQuery] string correo, string nombre)
        {
            try
            {
                _repo.EliminarTablero(correo, nombre);
                return Ok("Tablero eliminado correctamente");
            }
            catch
            {
                return BadRequest("Algo salio mal");
            }
        }
    }
}
