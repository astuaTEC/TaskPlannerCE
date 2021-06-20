using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.CPM;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.DTO;
using TaskPlannerCE_API.Models.Views;

namespace TaskPlannerCE_API.Repositories
{
    public class TableroRepo
    {

        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public TableroRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Metodo para crear un tablero nuevo
        /// </summary>
        /// <param name="tablero">El tablero a crear</param>
        public void CrearTablero(Tablero tablero)
        {
            if (tablero == null)
                throw new ArgumentNullException(nameof(tablero));

            _context.Tableros.Add(tablero);

        }

        /// <summary>
        /// Metodo para actualizar un tablero específico
        /// </summary>
        /// <param name="tablero">El tablero a actualizar</param>
        public void ActualizarTablero(Tablero tablero)
        {
            if (tablero == null)
                throw new ArgumentNullException(nameof(tablero));

            _context.Tableros.Update(tablero);
        }

        /// <summary>
        /// Metodo para crear un tipo de tablero nuevo
        /// </summary>
        /// <param name="tipo">El tipo de tablero a crear</param>
        public void CrearTipoTablero(TipoTablero tipo)
        {
            if (tipo == null)
                throw new ArgumentNullException(nameof(tipo));

            _context.TipoTableros.Add(tipo);

        }

        /// <summary>
        /// Metodo para eliminar un tablero específico
        /// </summary>
        /// <param name="correo">El correo del propietario del tablero</param>
        /// <param name="nombre">el nombre del tablero a eliminar</param>
        public void EliminarTablero(string correo, string nombre)
        {
            _context.Database.ExecuteSqlRaw("spEliminarTablero @p0, @p1",
                correo, nombre);
        }

        /// <summary>
        /// Metodo para eliminar un tipo de tablero
        /// </summary>
        /// <param name="nombre">El nombre del tipo a eliminar</param>
        public void EliminarTipoTablero(string nombre)
        {
            _context.Database.ExecuteSqlRaw("spEliminarTipoTablero @p0",
                nombre);
        }

        /// <summary>
        /// Metodo para agregar una lista de colaboradores a un tablero
        /// </summary>
        /// <param name="listaET">la lista de colaboradores a agregar</param>
        public void AgregarColaboradores(List<EstudianteTablero> listaET)
        {
            if (listaET == null)
                throw new ArgumentNullException(nameof(listaET));

            _context.EstudianteTableros.AddRange(listaET);

        }

        /// <summary>
        /// Metodo para agregar una lista de observadores a un tablero
        /// </summary>
        /// <param name="listaTP">La lista de observadores a agregar</param>
        public void AgregarObservadores(List<TableroProfesor> listaTP)
        {
            if (listaTP == null)
                throw new ArgumentNullException(nameof(listaTP));

            _context.TableroProfesors.AddRange(listaTP);

        }


        /// <summary>
        /// Metodo para eliminar a un colaborador de  un tablero específico
        /// </summary>
        /// <param name="correo">el correo del propietario del tablero</param>
        /// <param name="nombreTablero">el nombre del tablero</param>
        /// <param name="correoC">el correo del colaborador a eliminar</param>
        public void EliminarColaborador(string correo, string nombreTablero, string correoC)
        {
            _context.Database.ExecuteSqlRaw("spEliminarColaborador @p0, @p1, @p2",
                correo, nombreTablero, correoC);
        }

        /// <summary>
        /// Metodo para eliminar un observador específico
        /// </summary>
        /// <param name="correo">El correo del propietario del tablero</param>
        /// <param name="nombreTablero">El nombre del tablero</param>
        /// <param name="correoO">El correo del observador a eliminar</param>
        public void EliminarObservador(string correo, string nombreTablero, string correoO)
        {
            _context.Database.ExecuteSqlRaw("spEliminarObservador @p0, @p1, @p2",
                correo, nombreTablero, correoO);
        }

        /// <summary>
        /// Metodo para acceder a los tableros creados por determinado estudiante
        /// </summary>
        /// <param name="miCorreo">el correo del estudiante que hace la consulta</param>
        /// <returns>la lista de tableros creados en caso de que tenga</returns>
        public List<MisTablerosView> getMisTableros(string miCorreo)
        {
            return _context.Set<MisTablerosView>().FromSqlRaw($"EXEC spGetmisTableros " +
                            $"@miCorreo = {miCorreo}").ToList();
        }

        /// <summary>
        /// Metodo para acceder a los tableros en los que soy observador
        /// </summary>
        /// <param name="correo">El correo del profesor solicitante</param>
        /// <returns>La lista de tableros observados</returns>
        public List<MisTablerosView> getMisTablerosObservados(string correo)
        {
            return _context.Set<MisTablerosView>().FromSqlRaw($"EXEC spGetMisTablerosObservador " +
                            $"@correo = {correo}").ToList();
        }

        /// <summary>
        /// Metodo para acceder a los tableros en los que un estudiante es colaborador
        /// </summary>
        /// <param name="miCorreo">el correo del estudiante a consultar</param>
        /// <returns>la lista de tableros en los que colabora el estudiante</returns>
        public List<MisTablerosView> getTablerosColaborador(string miCorreo)
        {
            return _context.Set<MisTablerosView>().FromSqlRaw($"EXEC spGetTablerosColaboro " +
                            $"@miCorreo = {miCorreo}").ToList();
        }

        /// <summary>
        /// Método para acceder a un tablero específico con su información
        /// </summary>
        /// <param name="correo">El correo del propietario del tablero</param>
        /// <param name="nombre">El nombre del tablero</param>
        /// <returns>El tablero con su respectiva información</returns>
        public MisTablerosView getTablero(string correo, string nombre)
        {
            return _context.Set<MisTablerosView>().FromSqlRaw($"EXEC spGetTablero " +
                            $"@correo = {correo}, @nombre = {nombre}").ToList().FirstOrDefault();
        }

        /// <summary>
        /// Metodo para acceder a los colaboradores y visualizadores de un tablero específico
        /// </summary>
        /// <param name="correo">correo del propietario del tablero</param>
        /// <param name="nombreTablero">nombre del tablero a consultar</param>
        /// <returns>un objeto con los colaboradores y visualizadores</returns>
        public TableroInfoDTO getInfoTablero(string correo, string nombreTablero)
        {
            var colaboradores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetColaboradoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();

            var visualizadores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetVisualizadoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();

            var tableroInfo = new TableroInfoDTO
            {
                nombreTablero = nombreTablero
            };

            foreach(var visualizador in visualizadores)
            {
                tableroInfo.visualizadores.Add(visualizador);
            }
            
            foreach(var colaborador in colaboradores)
            {
                tableroInfo.colaboradores.Add(colaborador);
            }

            return tableroInfo;
        }

        /// <summary>
        /// Metodo para acceder a los visualizadores de un tablero especifico
        /// </summary>
        /// <param name="correo">el correo del propietario del tablero</param>
        /// <param name="nombreTablero">el nombre del tablero a consultar</param>
        /// <returns>la lista de visualizadores si existen</returns>
        public List<ColaboradoresView> GetVisualizadores(string correo, string nombreTablero)
        {
            return _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetVisualizadoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();
        }

        /// <summary>
        /// Método para acceder a todos los tipos de tableros
        /// </summary>
        /// <returns>La lista con los tipos de tableros</returns>
        public List<TipoTablero> GetTipos()
        {
            return _context.TipoTableros.ToList();
        }

        /// <summary>
        /// Metodo para acceder a los tipos de tablero con sus respectivos estados predeterminados
        /// </summary>
        /// <returns>La lista de tipos con sus respectivos estados</returns>
        public List<TipoEstadoDTO> GetTiposConEstadosAsociados()
        {
            var listaDeEstados = _context.Set<TipoTableroEstado>().FromSqlRaw($"EXEC spGetTiposConEstado").ToList();

            var tiposConEstado = new List<TipoEstadoDTO>();

            foreach(var te in listaDeEstados)
            {
                if(!verificarExistenciaTipo(te.NombreTipo, tiposConEstado))
                {
                    tiposConEstado.Add(new TipoEstadoDTO()
                    {
                        nombre = te.NombreTipo
                    });
                }
            }
            
            foreach (var tipo in tiposConEstado)
            {
                foreach (var estado in listaDeEstados)
                {
                    if (tipo.nombre == estado.NombreTipo && !estado.NombreEstado.Equals(""))
                    {
                        tipo.estados.Add(new EstadoAsociadoDTO() { nombre = estado.NombreEstado });
                    }
                }
            }

            return tiposConEstado;
        }

        /// <summary>
        /// Metodo para acceder a todos los estados con sus respectivas tareas
        /// </summary>
        /// <param name="correo">correo del propietario del tablero</param>
        /// <param name="nombreTablero">nombre del tablero a consultar</param>
        /// <returns>una lista con todos los estados y tareas asociadas</returns>
        public List<EstadoDTO> GetEstadosConTarea(string correo, string nombreTablero)
        {
            var tareasConEstado = _context.Set<TareaView>().FromSqlRaw($"EXEC spGetTareasTablero " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}").ToList();

            List<EstadoDTO> listaEstados = new List<EstadoDTO>();

            foreach (var tarea in tareasConEstado)
            { 

                if(!verificarExistenciaEstado(tarea.idEstado, listaEstados))
                {
                    EstadoDTO est = new EstadoDTO
                    {
                        nombre = tarea.nombreEstado,
                        idEstado = tarea.idEstado
                    };
                    listaEstados.Add(est);
                }
                
                foreach (var estado in listaEstados)
                {
                    if(tarea.idEstado == estado.idEstado && tarea.nombreTarea != null)
                    {
                        estado.tareas.Add(tarea);
                        break;
                    }
                }    
            }

            return listaEstados;
        }

        /// <summary>
        /// Metodo para verificar si existe un estado con un determinado nombre
        /// </summary>
        /// <param name="id">el id a consultar</param>
        /// <param name="estados">la lista de estados para verificar</param>
        /// <returns>un true si existe, false en caso contrario</returns>
        public bool verificarExistenciaEstado(int id, List<EstadoDTO> estados)
        {
            foreach (var estado in estados)
            {
                if (id == estado.idEstado)
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Metodo para verificar la existencia de un tipo de tablero con determinado nombre
        /// </summary>
        /// <param name="nombre">El nombre a consultar</param>
        /// <param name="tipos">La lista con los tipos de tableros existentes</param>
        /// <returns>Un true si existe, un false en caso contrario</returns>
        public bool verificarExistenciaTipo(string nombre, List<TipoEstadoDTO> tipos)
        {
            foreach (var tipo in tipos)
            {
                if (nombre == tipo.nombre)
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Metodo para acceder a los amigos y saber cuáles de ellos son colaboradores de un tablero
        /// </summary>
        /// <param name="correo">correo del propietario del tablero</param>
        /// <param name="nombreTablero">el nombre del tablero a consultar</param>
        /// <returns>la lista de estudiantes amigos e indica si es colaborador o no </returns>
        public List<ColaboradorAmigoDTO> GetAmigosColaboradores(string correo, string nombreTablero)
        {
            var colaboradores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetColaboradoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();

            var amigos = _context.Set<BuscarAmigoView>().FromSqlRaw($"EXEC spGetAmigos " +
                            $"@miCorreo = {correo}").ToList();

            List<ColaboradorAmigoDTO> colaboradoresAmigos = new List<ColaboradorAmigoDTO>();

            foreach(var amigo in amigos)
            {
                ColaboradorAmigoDTO ca = new ColaboradorAmigoDTO
                {
                    nombre = amigo.nombre,
                    correoInstitucional = amigo.correoAmigo
                };

                foreach(var colaborador in colaboradores)
                {
                    if (ca.correoInstitucional == colaborador.correoInstitucional)
                    {
                        ca.colaborador = true;
                        break;
                    }
                }
                colaboradoresAmigos.Add(ca);
            }
            return colaboradoresAmigos;
        }

        /// <summary>
        /// Metodo para acceder a los profes y saber cuáles de ellos son visualizadores de un tablero
        /// </summary>
        /// <param name="correo">correo del propietario del tablero</param>
        /// <param name="nombreTablero">el nombre del tablero a consultar</param>
        /// <returns>la lista de profesores e indica si es visualizador o no </returns>

        public List<ProfesorVisualizadorDTO> GetProfesoresYvisualizadores(string correo, string nombreTablero)
        {
            var visualizadores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetVisualizadoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();

            var profesores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetTodosProfes").ToList();

            List<ProfesorVisualizadorDTO> profesVisualizadores = new List<ProfesorVisualizadorDTO>();

            foreach(var profe in profesores)
            {
                ProfesorVisualizadorDTO pv = new ProfesorVisualizadorDTO
                {
                    nombre = profe.nombre,
                    correoInstitucional = profe.correoInstitucional
                };
                foreach (var visualizador in visualizadores)
                {
                    if (pv.correoInstitucional == visualizador.correoInstitucional)
                    {
                        pv.visualizador = true;
                        break;
                    }
                }
                profesVisualizadores.Add(pv);
            }

            return profesVisualizadores;
        }

        /// <summary>
        /// Metodo para acceder a la ruta crítica específica para un tablero
        /// </summary>
        /// <param name="correo">El correo del propietario del tablero</param>
        /// <param name="nombreTablero">El nombre del tablero a consultar</param>
        /// <returns>La ruta crítica</returns>
        public Ruta rutaCritica(string correo, string nombreTablero)
        {
            // se consulta la base de datos por las tareas y sus dependencias
            var tareasConDependencias = _context.Set<TareaCPMView>().FromSqlRaw($"EXEC spGetTareasCPM " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}").ToList();
            
            if(tareasConDependencias == null || tareasConDependencias.Count == 0)
            {
                return new Ruta();
            }

            // se llama al método que convierte lo retornado por la base de datos
            // en objetos que puede manejar el algoritmo
            var tareasCPM = generarTareasParaAlgoritmo(tareasConDependencias);

            var algoritmo = new AlgoritmoCPM();

            // se ejecuta el algoritmo y se retorna el resultado
            return algoritmo.ejecutarAlgoritmo(tareasCPM);
        }

        /// <summary>
        /// Metodo para convertir el resultado de la base de datos en objetos que usa el algoritmo
        /// </summary>
        /// <param name="tareasBD">Las tareas provenientes de la base de datos</param>
        /// <returns>La lista de objetos preparados para el algoritmo</returns>
        public List<TareaCPM> generarTareasParaAlgoritmo(List<TareaCPMView> tareasBD)
        {
            List<TareaCPM> listaTareas = new List<TareaCPM>();
            List<TareaCPM> listaTemp;

            // se crean nuevas tareas y se agregan a una lista
            foreach (var t in tareasBD)
            {
                if (!verificarExistencia(listaTareas, t.nombre)) // si la tarea no ha sido agregada, entonces se agrega
                {
                    var nuevaTarea = new TareaCPM(t.nombre, (t.fechaFinalizacion - t.fechaInicio).Days, 
                        t.fechaInicio, t.fechaFinalizacion);
                    listaTareas.Add(nuevaTarea);
                }
                
            }

            // se le agregan las dependencias a cada tarea
            foreach(var tarea in listaTareas)
            {
                foreach(var t in tareasBD)
                {
                    if(tarea.nombre == t.nombre)
                    {
                        tarea.dependencias.Add(new TareaCPM(t.dependencia, (t.fechaFinalizacion - t.fechaInicio).Days,
                        t.fechaInicio, t.fechaFinalizacion));
                    }
                    
                }
            }

            return listaTareas;
        }

        /// <summary>
        /// Metodo para verificar la existencia de una tareaCPM dentro de una lista
        /// </summary>
        /// <param name="lista">La lista a revisar</param>
        /// <param name="nombre">El nombre de la tarea a verificar</param>
        /// <returns>Un true si se encuentra, un false en caso contrario</returns>
        public bool verificarExistencia(List<TareaCPM> lista, string nombre)
        {
            foreach(var t in lista)
            {
                if (t.nombre.Equals(nombre))
                {
                    return true;
                }
            }
            return false;
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
