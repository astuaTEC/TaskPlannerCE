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
                            correoInstitucional = login.correoInstitucional,
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
                        //Se consulta a la base de datos de TaskPlannerCE a ver si es administrador
                        Administrador adminP = _context.Administradors.Where(x => x.CorreoInstitucional == 
                        login.correoInstitucional).FirstOrDefault();

                        // se crea el objeto a retornar
                        LoginReturn lr = new LoginReturn
                        {
                            correoInstitucional = login.correoInstitucional,
                            estudiante = false,
                            profesor = true
                        };

                        if (adminP != null)
                            lr.admin = true;
                        else
                            lr.admin = false;

                        return lr;
                    }
                    return null;
                }

                return null;
            }

            // si no es ni estudiante ni profesor
            //Se consulta a la base de datos de TaskPlannerCE
            Administrador admin = _context.Administradors.Where(x => x.CorreoInstitucional ==
                         login.correoInstitucional).FirstOrDefault();

            //si el administrador existe en TaskPlanner
            if (admin != null)
            {
                // se hace la consulta a DATIC
                var responseTaskProf = GetAsync("https://datic.azurewebsites.net/api/datic/profesorSinCedula"
                    + "?correo=" + login.correoInstitucional);

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
                            correoInstitucional = login.correoInstitucional,
                            estudiante = false,
                            profesor = false,
                            admin = true
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
        /// Metodo para registar un estudiante en TaskPlannerCE
        /// </summary>
        /// <param name="estudiante">El estudiante a registrar</param>
        /// <returns>Un true en caso de exito, false en caso contrario</returns>
        public bool RegistrarEstudiante(Estudiante estudiante)
        {

            // se le hace la consulta del estudiante a DATIC
            var responseTaskEst = GetAsync("https://datic.azurewebsites.net/api/datic/estudiante"
               + "?correo=" + estudiante.CorreoInstitucional + "&carnet=" + estudiante.Carnet);

            var resultEst = responseTaskEst.Result;

            //Si se obtiene exito en la consulta
            if (resultEst != null) // si el resultado no es nulo
            {
                // se parsea el resultado
                EstudianteDatic estDatic = JsonConvert.DeserializeObject<EstudianteDatic>(resultEst);

                if(estudiante.CarreraMatriculada == estDatic.carrera &&
                    estDatic.activo)
                {
                    _context.Estudiantes.Add(estudiante);
                    return true;
                }

                return false;
            }

            return false;
        }

        /// <summary>
        /// Metodo para registrar un profesor en TaskPlannerCE
        /// </summary>
        /// <param name="profesor">El profesor a registrar</param>
        /// <returns>Un true en caso de éxito, false en caso contrario</returns>
        public bool RegistrarProfesor(Profesor profesor)
        {

            // se le hace la consulta del estudiante a DATIC
            var responseTaskProf = GetAsync("https://datic.azurewebsites.net/api/datic/profesor"
               + "?correo=" + profesor.CorreoInstitucional + "&cedula=" + profesor.Carnet);

            var resultProf = responseTaskProf.Result;

            //Si se obtiene exito en la consulta
            if (resultProf != null) // si el resultado no es nulo
            {
                // se parsea el resultado
                ProfesorDatic profDatic = JsonConvert.DeserializeObject<ProfesorDatic>(resultProf);

                if (profesor.Carnet == profDatic.cedula &&
                    profesor.CorreoInstitucional == profDatic.correoInstitucional)
                {
                    _context.Profesors.Add(profesor);
                    return true;
                }

                return false;
            }

            return false;
        }

        public bool RegistrarAdmin(Administrador administrador)
        {

            // se le hace la consulta del estudiante a DATIC
            var responseTaskProf = GetAsync("https://datic.azurewebsites.net/api/datic/profesor"
               + "?correo=" + administrador.CorreoInstitucional + "&cedula=" + administrador.Carnet);

            var resultProf = responseTaskProf.Result;

            //Si se obtiene exito en la consulta
            if (resultProf != null) // si el resultado no es nulo
            {
                // se parsea el resultado
                ProfesorDatic profDatic = JsonConvert.DeserializeObject<ProfesorDatic>(resultProf);

                if (administrador.Carnet == profDatic.cedula &&
                    administrador.CorreoInstitucional == profDatic.correoInstitucional)
                {
                    _context.Administradors.Add(administrador);
                    return true;
                }

                return false;
            }

            return false;
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

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
