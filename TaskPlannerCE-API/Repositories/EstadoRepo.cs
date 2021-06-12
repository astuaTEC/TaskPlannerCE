using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;
using TaskPlannerCE_API.Models.InObjects;

namespace TaskPlannerCE_API.Repositories
{
    public class EstadoRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public EstadoRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Metodo para cambiarle el nombre a un estado
        /// </summary>
        /// <param name="ei">El objeto estado a actualizar</param>
        public void actualizarNombreEstado(EstadoIn ei)
        {
            _context.Database.ExecuteSqlRaw("spActualizarNombreEstado @p0, @p1, @p2, @p3",
                ei.correoEstudiante, ei.nombreTablero, ei.nombre, ei.idEstado);
        }

        /// <summary>
        /// Metodo para eliminar un estado en específico
        /// </summary>
        /// <param name="id">el ide del estado a eliminar</param>
        /// <param name="correo">el correo del propietario del tablero</param>
        /// <param name="nombreTablero">El nombre del tablero en donde se encuentra el estado</param>
        public void EliminarEstado(int id, string correo, string nombreTablero)
        {
            _context.Database.ExecuteSqlRaw("spEliminarEstado @p0, @p1, @p2",
                id, correo, nombreTablero);
        }

        /// <summary>
        /// Método para eliminar un estado asociado a un tipo de tablero
        /// </summary>
        /// <param name="nombreTipo">El nombre del tipo al que está asociado el estado</param>
        /// <param name="nombreEstado">El nombre del estado a eliminar</param>
        public void EliminarEstadoDeTipo(string nombreTipo, string nombreEstado)
        {
            _context.Database.ExecuteSqlRaw("spEliminarEstadoTipo @p0, @p1",
                nombreTipo, nombreEstado);
        }

        /// <summary>
        /// Metodo para asociar una lista de estados predeterminados a un tipo de tablero
        /// </summary>
        /// <param name="tte">La lista de estados</param>
        public void AgregarEstadosAtipo(List<TipoTableroEstado> tte)
        {
            if (tte == null)
                throw new ArgumentNullException(nameof(tte));

            _context.TipoTableroEstados.AddRange(tte);

        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
