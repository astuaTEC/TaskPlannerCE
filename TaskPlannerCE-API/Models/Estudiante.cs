using System;
using System.Collections.Generic;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class Estudiante
    {
        public Estudiante()
        {
            EstudianteAmigoCorreoAmigoNavigations = new HashSet<EstudianteAmigo>();
            EstudianteAmigoCorreoEstudianteNavigations = new HashSet<EstudianteAmigo>();
            EstudianteTableros = new HashSet<EstudianteTablero>();
            Tableros = new HashSet<Tablero>();
            TareaEstudiantes = new HashSet<TareaEstudiante>();
        }

        public string Carnet { get; set; }
        public string CorreoInstitucional { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string Telefono { get; set; }
        public string CarreraMatriculada { get; set; }
        public string ProvinciaResidencia { get; set; }
        public string ProvinciaUniversidad { get; set; }
        public string AreaDeInteres { get; set; }

        public virtual ICollection<EstudianteAmigo> EstudianteAmigoCorreoAmigoNavigations { get; set; }
        public virtual ICollection<EstudianteAmigo> EstudianteAmigoCorreoEstudianteNavigations { get; set; }
        public virtual ICollection<EstudianteTablero> EstudianteTableros { get; set; }
        public virtual ICollection<Tablero> Tableros { get; set; }
        public virtual ICollection<TareaEstudiante> TareaEstudiantes { get; set; }
    }
}
