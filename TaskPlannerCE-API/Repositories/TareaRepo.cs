using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.DTO;
using TaskPlannerCE_API.Models.InObjects;
using TaskPlannerCE_API.Models.Views;

namespace TaskPlannerCE_API.Repositories
{
    public class TareaRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public TareaRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

        public void EliminarTarea(string correo, string nombreTablero, string nombre)
        {
            _context.Database.ExecuteSqlRaw("spEliminarTarea @p0, @p1, @p2",
                correo, nombreTablero, nombre);
        }

        public void AgregarDependencia(TareaDependencium td)
        {
            if (td == null)
                throw new ArgumentNullException(nameof(td));

            _context.TareaDependencia.Add(td);

        }

        /// <summary>
        /// Metodo para agreagar una lista de dependencias relacionadas a una tarea
        /// </summary>
        /// <param name="ltd">Lista de dependencias a agregar</param>
        public void AgregarDependencia(List<TareaDependencium> ltd)
        {
            if (ltd == null)
                throw new ArgumentNullException(nameof(ltd));

            _context.TareaDependencia.AddRange(ltd);

        }

        /// <summary>
        /// Metodo para agregar una lista de responsables
        /// </summary>
        /// <param name="lte">la lista de responsables a agregar</param>
        public void AgregarResponsables(List<TareaEstudiante> lte)
        {
            if (lte == null)
                throw new ArgumentNullException(nameof(lte));

            _context.TareaEstudiantes.AddRange(lte);

        }

        /// <summary>
        /// Metodo para eliminar una dependencia de una tarea
        /// </summary>
        /// <param name="correo">El correo del propietario del tablero</param>
        /// <param name="nombreTablero">el nombre del tablero</param>
        /// <param name="nombreTarea">El nombre de la tarea que se edita</param>
        /// <param name="nombreTareaD">el nombre de la tarea de la cual se quita la dependencia</param>
        public void EliminarDependencia(string correo, string nombreTablero, string nombreTarea, string nombreTareaD)
        {
            _context.Database.ExecuteSqlRaw("spEliminarDependencia @p0, @p1, @p2, @p3",
                correo, nombreTablero, nombreTarea, nombreTareaD);
        }

        /// <summary>
        /// Metodo para eliminar a un responsable de una tarea
        /// </summary>
        /// <param name="correo">l correo del propietario del tablero</param>
        /// <param name="nombreTablero">el nombre del tablero</param>
        /// <param name="nombreTarea">El nombre de la tarea que se edita</param>
        /// <param name="correoR">El correo del responsable a eliminar</param>
        public void EliminarResponsable(string correo, string nombreTablero, string nombreTarea, string correoR)
        {
            _context.Database.ExecuteSqlRaw("spEliminarResponsable @p0, @p1, @p2, @p3",
                correo, nombreTablero, nombreTarea, correoR);
        }

        /// <summary>
        /// Metodo para acceder a los responsables y dependencias de una tarea específica
        /// </summary>
        /// <param name="correo">correo del creador del tablero</param>
        /// <param name="nombreTablero">nombre del tablero donde se encuantra la tarea</param>
        /// <param name="nombreTarea">nombre de la tarea a consultar</param>
        /// <param name="estado">estado al que pertenece esa tarea</param>
        /// <returns>un objeto con la información de la tarea</returns>
        public TareaInfoDTO GetInfoTarea(string correo, string nombreTablero, string nombreTarea)
        {
            var responsables = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetResponsablesTarea " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}, @nombreTarea = {nombreTarea}").ToList();

            var dependencias = _context.Set<TareaSimpleView>().FromSqlRaw($"EXEC spGetDependenciasTarea " +
                            $"@correo = {correo}, @nombreTablero = {nombreTablero}, @nombreTarea = {nombreTarea}").ToList();

            var tareasTotales = _context.Set<TareaSimpleView>().FromSqlRaw($"EXEC spGetTareasTableroSinEstado " +
                            $"@correo = {correo}, @nombre = {nombreTablero}, @nombreTarea = {nombreTarea}").ToList();

            var colaboradores = _context.Set<ColaboradoresView>().FromSqlRaw($"EXEC spGetColaboradoresTablero " +
                            $"@correo = {correo}, @nombre = {nombreTablero}").ToList();

            var tareaInfo = new TareaInfoDTO
            {
                nombreTarea = nombreTarea
            };

            foreach(var tarea in tareasTotales)
            {
                var tareaDependencia = new TareaDependenciaDTO
                {
                    nombreTarea = tarea.nombreTarea
                };

                if (verificarDependencia(tarea.nombreTarea, dependencias))
                    tareaDependencia.dependencia = true;
                else
                    tareaDependencia.dependencia = false;

                tareaInfo.dependencias.Add(tareaDependencia);
            }

            foreach(var colaborador in colaboradores)
            {
                var colaboradorEncargado = new ColaboradorEncargadoDTO
                {
                    nombre = colaborador.nombre,
                    correoInstitucional = colaborador.correoInstitucional
                };

                if (verificarResponsable(colaborador.nombre, responsables))
                    colaboradorEncargado.encargado = true;
                else
                    colaboradorEncargado.encargado = false;

                tareaInfo.encargados.Add(colaboradorEncargado);
            }

            return tareaInfo;
        }

        /// <summary>
        /// Metodo para saber si una colaborador es responsable de una tarea
        /// </summary>
        /// <param name="nombre">el nombre del colaborador a consultar</param>
        /// <param name="responsables">los responsables existentes</param>
        /// <returns>true en caso de que sea responsable, false en caso contrario</returns>
        public bool verificarResponsable(string nombre, List<ColaboradoresView> responsables)
        {
            foreach(var responsable in responsables)
            {
                if(nombre == responsable.nombre)
                {
                    return true;
                }

            }
            return false;
        }

        /// <summary>
        /// Metodo para verificar si una tarea es dependiente de otra
        /// </summary>
        /// <param name="nombre">nombre de la tarea a consultar</param>
        /// <param name="dependencias">las tareas que son dependientes</param>
        /// <returns>un true en caso de que sea dependiente, false en caso contrario</returns>
        public bool verificarDependencia(string nombre, List<TareaSimpleView> dependencias)
        {
            foreach(var dependencia in dependencias)
            {
                if(nombre == dependencia.nombreTarea)
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Metodo para actualizar el estado de una tarea
        /// </summary>
        /// <param name="te"></param>
        public void actualizarEstado(TareaEstadoIn te)
        {
            _context.Database.ExecuteSqlRaw("spActualizarEstadoTarea @p0, @p1, @p2, @p3",
                te.correoEstudiante, te.nombreTablero, te.nombreTarea, te.idEstado);
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
