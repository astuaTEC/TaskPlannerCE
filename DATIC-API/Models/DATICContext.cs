using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace DATIC_API.Models
{
    public partial class DATICContext : DbContext
    {
        public DATICContext()
        {
        }

        public DATICContext(DbContextOptions<DATICContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Estudiante> Estudiantes { get; set; }
        public virtual DbSet<Profesor> Profesors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Estudiante>(entity =>
            {
                entity.HasKey(e => new { e.CorreoInstitucional, e.CarnetInstitucional })
                    .HasName("PK__ESTUDIAN__F26DED2404F3670A");

                entity.ToTable("ESTUDIANTE");

                entity.Property(e => e.CorreoInstitucional)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoInstitucional");

                entity.Property(e => e.CarnetInstitucional)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("carnetInstitucional");

                entity.Property(e => e.Activo).HasColumnName("activo");

                entity.Property(e => e.Carrera)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("carrera");

                entity.Property(e => e.Contrasena)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("contrasena");
            });

            modelBuilder.Entity<Profesor>(entity =>
            {
                entity.HasKey(e => new { e.CorreoInstitucional, e.Cedula })
                    .HasName("PK__PROFESOR__F463FB6E4BE4D368");

                entity.ToTable("PROFESOR");

                entity.Property(e => e.CorreoInstitucional)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoInstitucional");

                entity.Property(e => e.Cedula)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("cedula");

                entity.Property(e => e.Contrasena)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("contrasena");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
