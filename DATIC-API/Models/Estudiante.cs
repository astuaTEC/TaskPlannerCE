using System;
using System.Collections.Generic;

#nullable disable

namespace DATIC_API.Models
{
    public partial class Estudiante
    {
        public string CorreoInstitucional { get; set; }
        public string CarnetInstitucional { get; set; }
        public string Contrasena { get; set; }
        public string Carrera { get; set; }
        public bool Activo { get; set; }
    }
}
