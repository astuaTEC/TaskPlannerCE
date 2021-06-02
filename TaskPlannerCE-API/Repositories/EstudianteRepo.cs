using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.Views;
using TaskPlannerCE_API.Models.DTO;

namespace TaskPlannerCE_API.Repositories
{
    public class EstudianteRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public EstudianteRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Metodo para acceder a la informacion de un perfil
        /// </summary>
        /// <param name="correoInstitucional">El correo a consultar</param>
        /// <returns>la informacion relacionada al estudiante</returns>
        public Estudiante GetMiInfo(string correoInstitucional)
        {
            return _context.Estudiantes.Where(x => x.CorreoInstitucional == correoInstitucional).FirstOrDefault();
        }

        /// <summary>
        /// Metodo para acceder a todos los estudiantes del sistema, menos al estudiante que realiza la consulta.
        /// </summary>
        /// <param name="correo">el estudiante que realiza la consulta</param>
        /// <returns>la lista de estudiantes</returns>
        public List<ColaboradoresView> getTodosEstudiantes(string correo)
        {
            return _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetTodosEstudiantes " +
                            $"@correo = {correo}").ToList();
        }

        /// <summary>
        /// Metodo para acceder a todos los amigos disponibles
        /// </summary>
        /// <param name="miCorreo">el correo del estudiante que realiza la consulta</param>
        /// <returns>la lista de amigos</returns>
        public List<BuscarAmigoView> getMisAmigos(string miCorreo)
        {
            return _context.Set<BuscarAmigoView>().FromSqlRaw($"EXEC spGetAmigos " +
                            $"@miCorreo = {miCorreo}").ToList();
        }

        /// <summary>
        /// Metodo para acceder a los estudiantes que no son amigos de un estudiante específico
        /// </summary>
        /// <param name="miCorreo">el estudainte que realiza la consulta</param>
        /// <returns>la lista de estudiantes que no son amigos</returns>
        public List<BuscarEstudiantesView> getEstudiantesNoAmigos(string miCorreo)
        {
            return _context.Set<BuscarEstudiantesView>().FromSqlRaw($"EXEC spGetEstudiantesNoAmigos " +
                            $"@miCorreo = {miCorreo}").ToList();
        }

        /// <summary>
        /// Metodo para buscar un amigo por nombre o por correo institucional
        /// </summary>
        /// <param name="miCorreo">El correo del estudiante que realiza la consulta</param>
        /// <param name="variable">El nombre o el correo del amigo a consultar</param>
        /// <returns></returns>
        public List<BuscarAmigoView> buscarAmigo(string miCorreo, string variable)
        {
            return _context.Set<BuscarAmigoView>().FromSqlRaw($"EXEC spBuscarAmigos " +
                            $"@miCorreo = {miCorreo}, @variable = {variable}").ToList();
        }

        /// <summary>
        /// Metodo para buscar estudiantes por nombre o correo electronico e indica si es amigo o no
        /// </summary>
        /// <param name="miCorreo">El correo del que hace la consulta</param>
        /// <param name="variable">El correo o el nombre a buscar</param>
        /// <returns>lista de estudiantes encontrados</returns>
        public List<BuscarEstudiantesDTO> buscarEstudiantes(string miCorreo, string variable)
        {
            var estudiantesTotales = _context.Set<BuscarEstudiantesView>().FromSqlRaw($"EXEC spBuscarEstudiantes " +
                            $"@miCorreo = {miCorreo}, @variable = {variable}").ToList();

            var amigos = _context.Set<BuscarAmigoView>().FromSqlRaw($"EXEC spGetAmigos " +
                            $"@miCorreo = {miCorreo}").ToList();

            List<BuscarEstudiantesDTO> resultado = new List<BuscarEstudiantesDTO>();

            foreach(var estudiante in estudiantesTotales)
            {
                var est = new BuscarEstudiantesDTO
                {
                    correoInstitucional = estudiante.correoInstitucional,
                    carnet = estudiante.correoInstitucional,
                    nombre = estudiante.nombre
                };

                foreach (var amigo in amigos)
                {
                    if(estudiante.correoInstitucional == amigo.correoAmigo)
                    {
                        est.amigo = true;
                        break;
                    }
                }
                resultado.Add(est);
            }

            return resultado;
        }

    }
}
