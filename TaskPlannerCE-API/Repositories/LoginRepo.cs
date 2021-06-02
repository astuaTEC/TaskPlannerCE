using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.DaticModels;

namespace TaskPlannerCE_API.Repositories
{
    public class LoginRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        public object EstudianteDatic { get; private set; }

        // Inject the Data Base Context
        public LoginRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Metodo encargado de verificar el login de estudiante, cliente y administrador
        /// </summary>
        /// <param name="login">el objeto con el correo y contraseña ingresados</param>
        /// <returns>Un objeto en caso de éxito, null en caso contrario</returns>
        public LoginReturn verificarLogin(Login login)
        {
            // se accede a la base de datos de TaskPlannerCE
            Estudiante est = _context.Estudiantes.Where(x => x.CorreoInstitucional == login.correoInstitucional).FirstOrDefault();

            // si el estudiante existe en TaskPlanner
            if(est != null)
            {
                // se le hace la consulta de la contraseña a DATIC
                var responseTaskEst = GetAsync("https://datic.azurewebsites.net/api/datic/estudianteSinCarnet"
                   + "?correo=" + login.correoInstitucional);

                var resultEst = responseTaskEst.Result;

                //Si se obtiene exito en la consulta
                if (resultEst != null) // si el resultado no es nulo
                {
                    // se parsea el resultado
                    EstudianteDatic estDatic = JsonConvert.DeserializeObject<EstudianteDatic>(resultEst);
                    
                    // se valida la contraseña
                    if (estDatic.contrasena == login.contrasena)
                    {
                        // se crea el objeto a retornar
                        LoginReturn lr = new LoginReturn
                        {
                            correoIstitucional = login.correoInstitucional,
                            estudiante = true,
                            profesor = false,
                            admin = false
                        };

                        return lr;
                    }
                    return null;
                }
            }
            
            // sino es estudiante, se valida si es profesor.
            //Se consulta a la base de datos de TaskPlannerCE
            Profesor prof = _context.Profesors.Where(x => x.CorreoInstitucional == login.correoInstitucional).FirstOrDefault();

            //si el profesor existe en TaskPlanner
            if (prof != null)
            {
                // se hace la consulta a DATIC
                var responseTaskProf = GetAsync("https://datic.azurewebsites.net/api/datic/profesor"
                    + "?correo=" + login.correoInstitucional + "&cedula=" + prof.Carnet);

                var result = responseTaskProf.Result;

                // se se obtiene exito
                if (result != null) // si el resultado no es nulo
                {
                    // se parsea el resultado
                    ProfesorDatic profDatic = JsonConvert.DeserializeObject<ProfesorDatic>(result);

                    //Se valida la contraseña
                    if (profDatic.contrasena == login.contrasena)
                    {
                        // se crea el objeto a retornar
                        LoginReturn lr = new LoginReturn
                        {
                            correoIstitucional = login.correoInstitucional,
                            estudiante = false,
                            profesor = true,
                            admin = prof.Administrador
                        };
                        return lr;
                    }
                    return null;
                }

                return null;
            }

            return null;
        }

        /// <summary>
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
    }
}
