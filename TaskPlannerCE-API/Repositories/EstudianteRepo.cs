using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.Views;
using TaskPlannerCE_API.Models.DTO;
using System.Net.Http;

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

        public void EliminarUsuario(string correo)
        {
            _context.Database.ExecuteSqlRaw("spEliminarUsuario @p0",
               correo);
        }

        /// <summary>
        /// Metoododo para acceder a los ultimos 5 amigos de un estudiante
        /// </summary>
        /// <param name="correo">el correo del estudiante que solicita la petición</param>
        /// <returns>La lista con los últimos cinco amigos</returns>
        public List<UltimosAmigosView> GetUltimosCincoAmigos(string correo)
        {
            return _context.Set<UltimosAmigosView>().FromSqlRaw($"EXEC spGetUltimosCincoAmigos " +
                            $"@correo = {correo}").ToList();
        }

        public List<TablerosXmesDTO> GetTablerosPorMes(string correo)
        {
            var resultado = _context.Set<TablerosXmesView>().FromSqlRaw($"EXEC spGetTablerosPorMes " +
                            $"@correo = {correo}").ToList();

            var lista = new List<TablerosXmesDTO>();

            foreach (var r in resultado)
            {
                var estadistica = new TablerosXmesDTO()
                {
                    mes = GenerarMes(r.mes),
                    cantidad = r.cantidad
                };
                lista.Add(estadistica);
            }

            return lista;
        }

        /// <summary>
        /// Metodo para enviar una solicitud de amistad
        /// </summary>
        /// <param name="solicitud">La solicitud a enviar</param>
        public void EnviarSolicitudAmistad(Solicitud solicitud)
        {
            if (solicitud == null)
                throw new ArgumentNullException(nameof(solicitud));

            _context.Solicituds.Add(solicitud);

        }

        /// <summary>
        /// Metodo para acceder a las solicitudes que posee un estudiante
        /// </summary>
        /// <param name="correo">el correo del estudiante que solicita</param>
        /// <returns></returns>
        public List<Solicitud> GetMisSolicitudes(string correo)
        {
            return _context.Set<Solicitud>().FromSqlRaw($"EXEC spGetMisSolicitudes " +
                            $"@miCorreo = {correo}").ToList();
        }

        /// <summary>
        /// Metodo para acceder al número de tableros de un estudiante
        /// </summary>
        /// <param name="correo">El estudiante que realiza la consulta</param>
        /// <returns>El objeto número con el numero de tableros </returns>
        public int GetNumeroDeTableros(string correo)
        {
            return _context.Set<MisTablerosView>().FromSqlRaw($"EXEC spGetmisTableros " +
                            $"@miCorreo = {correo}").ToList().Count();
        }

        /// <summary>
        /// Metodo para aceptar una solicitud de amistad
        /// </summary>
        /// <param name="correoE">El correo de quien había enviado la solicitud</param>
        /// <param name="correoR">El correo de quien había recibido la solicitud</param>
        public void AceptarSolicitud(string correoE, string correoR)
        {
            _context.Database.ExecuteSqlRaw("spActualizarEstadoSolicitud @p0, @p1, @p2",
               correoE, correoR, "Aceptado");
        }

        /// <summary>
        /// Metodo para rechazar una solicitud de amistad
        /// </summary>
        /// <param name="correoE">El correo de quien había enviado la solicitud</param>
        /// <param name="correoR">El correo de quien había recibido la solicitud</param>
        public void RechazarSolicitud(string correoE, string correoR)
        {
            _context.Database.ExecuteSqlRaw("spActualizarEstadoSolicitud @p0, @p1, @p2",
               correoE, correoR, "Rechazado");
        }

        /// <summary>
        /// Metodo para eliminar a un amigo
        /// </summary>
        /// <param name="correoE">correo del estudiante que solicita la peticion</param>
        /// <param name="correoA">correo del amigo a eliminar</param>
        public void EliminarAmigo(string correoE, string correoA)
        {
            _context.Database.ExecuteSqlRaw("spEliminarAmigo @p0, @p1",
               correoE, correoA);
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

        // <summary>
        /// Método para acceder a otra api y retornar un resultado
        /// </summary>
        /// <param name="uri">La uri de la API a consultar</param>
        /// <returns>El resultado de la petición</returns>
        public async Task<string> GetAsync(string uri)
        {
            var httpClient = new HttpClient();
            var content = await httpClient.GetStringAsync(uri);
            return content;
        }

        /// <summary>
        /// Metodo para asignar el nombre del mes de acuerdo a un número ingresado
        /// </summary>
        /// <param name="mes">El numero de mes</param>
        /// <returns>El nombre correspondiente al mes</returns>
        public string GenerarMes(int mes)
        {
            switch (mes)
            {
                case 1:
                    return "Enero";
                case 2:
                    return "Febrero";
                case 3:
                    return "Marzo";
                case 4:
                    return "Abril";
                case 5:
                    return "Mayo";
                case 6:
                    return "Junio";
                case 7:
                    return "Julio";
                case 8:
                    return "Agosto";
                case 9:
                    return "Setiembre";
                case 10:
                    return "Octubre";
                case 11:
                    return "Noviembre";
                case 12:
                    return "Diciembre";
            }
            return null;
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
