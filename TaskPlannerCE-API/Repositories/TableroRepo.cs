﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

                if(!verificarExistenciaEstado(tarea.nombreEstado, listaEstados))
                {
                    EstadoDTO est = new EstadoDTO
                    {
                        nombre = tarea.nombreEstado
                    };
                    listaEstados.Add(est);
                }
                
                foreach (var estado in listaEstados)
                {
                    if(tarea.nombreEstado == estado.nombre && tarea.nombreTarea != null)
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
        /// <param name="nombre">el nombre a consultar</param>
        /// <param name="estados">la lista de estados para verificar</param>
        /// <returns>un true si existe, false en caso contrario</returns>
        public bool verificarExistenciaEstado(string nombre, List<EstadoDTO> estados)
        {
            foreach (var estado in estados)
            {
                if (nombre == estado.nombre)
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
    }
}
