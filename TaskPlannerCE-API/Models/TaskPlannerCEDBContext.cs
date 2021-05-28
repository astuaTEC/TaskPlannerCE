using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace TaskPlannerCE_API.Models
{
    public partial class TaskPlannerCEDBContext : DbContext
    {
        public TaskPlannerCEDBContext()
        {
        }

        public TaskPlannerCEDBContext(DbContextOptions<TaskPlannerCEDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Estado> Estados { get; set; }
        public virtual DbSet<Estudiante> Estudiantes { get; set; }
        public virtual DbSet<EstudianteAmigo> EstudianteAmigos { get; set; }
        public virtual DbSet<EstudianteTablero> EstudianteTableros { get; set; }
        public virtual DbSet<Profesor> Profesors { get; set; }
        public virtual DbSet<Tablero> Tableros { get; set; }
        public virtual DbSet<TableroProfesor> TableroProfesors { get; set; }
        public virtual DbSet<Tarea> Tareas { get; set; }
        public virtual DbSet<TareaDependencium> TareaDependencia { get; set; }
        public virtual DbSet<TareaEstudiante> TareaEstudiantes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Estado>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.Nombre })
                    .HasName("PK__ESTADO__C3E874D6EE22291B");

                entity.ToTable("ESTADO");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.Estados)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTADO__3552E9B6");
            });

            modelBuilder.Entity<Estudiante>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__ESTUDIAN__A0764CD0C092F42F");

                entity.ToTable("ESTUDIANTE");

                entity.Property(e => e.CorreoInstitucional)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoInstitucional");

                entity.Property(e => e.AreaDeInteres)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("areaDeInteres");

                entity.Property(e => e.Carnet)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("carnet");

                entity.Property(e => e.CarreraMatriculada)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("carreraMatriculada");

                entity.Property(e => e.PrimerApellido)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("primerApellido");

                entity.Property(e => e.PrimerNombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("primerNombre");

                entity.Property(e => e.ProvinciaResidencia)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("provinciaResidencia");

                entity.Property(e => e.ProvinciaUniversidad)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("provinciaUniversidad");

                entity.Property(e => e.SegundoApellido)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("segundoApellido");

                entity.Property(e => e.SegundoNombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("segundoNombre");

                entity.Property(e => e.Telefono)
                    .IsRequired()
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .HasColumnName("telefono");
            });

            modelBuilder.Entity<EstudianteAmigo>(entity =>
            {
                entity.HasKey(e => e.CorreoEstudiante)
                    .HasName("PK__ESTUDIAN__190729D2B3483391");

                entity.ToTable("ESTUDIANTE_AMIGO");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.CorreoAmigo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoAmigo");

                entity.HasOne(d => d.CorreoAmigoNavigation)
                    .WithMany(p => p.EstudianteAmigoCorreoAmigoNavigations)
                    .HasForeignKey(d => d.CorreoAmigo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__3A179ED3");

                entity.HasOne(d => d.CorreoEstudianteNavigation)
                    .WithOne(p => p.EstudianteAmigoCorreoEstudianteNavigation)
                    .HasForeignKey<EstudianteAmigo>(d => d.CorreoEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__39237A9A");
            });

            modelBuilder.Entity<EstudianteTablero>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero })
                    .HasName("PK__ESTUDIAN__059ADB6A9396396A");

                entity.ToTable("ESTUDIANTE_TABLERO");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

                entity.Property(e => e.CorreoColaborador)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoColaborador");

                entity.HasOne(d => d.CorreoColaboradorNavigation)
                    .WithMany(p => p.EstudianteTableros)
                    .HasForeignKey(d => d.CorreoColaborador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__3EDC53F0");

                entity.HasOne(d => d.Tablero)
                    .WithOne(p => p.EstudianteTablero)
                    .HasForeignKey<EstudianteTablero>(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANTE_TABLE__3DE82FB7");
            });

            modelBuilder.Entity<Profesor>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__PROFESOR__A0764CD0445BADE3");

                entity.ToTable("PROFESOR");

                entity.Property(e => e.CorreoInstitucional)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoInstitucional");

                entity.Property(e => e.Administrador).HasColumnName("administrador");

                entity.Property(e => e.Carnet)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("carnet");

                entity.Property(e => e.PrimerApellido)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("primerApellido");

                entity.Property(e => e.PrimerNombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("primerNombre");

                entity.Property(e => e.SegundoApellido)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("segundoApellido");

                entity.Property(e => e.SegundoNombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("segundoNombre");

                entity.Property(e => e.Telefono)
                    .IsRequired()
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .HasColumnName("telefono");
            });

            modelBuilder.Entity<Tablero>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.Nombre })
                    .HasName("PK__TABLERO__7E2DD21EF19CA5C1");

                entity.ToTable("TABLERO");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("tipo");

                entity.HasOne(d => d.CorreoEstudianteNavigation)
                    .WithMany(p => p.Tableros)
                    .HasForeignKey(d => d.CorreoEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO__correoE__345EC57D");
            });

            modelBuilder.Entity<TableroProfesor>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.CorreoProfesor })
                    .HasName("PK__TABLERO___EE46085EF092DDD0");

                entity.ToTable("TABLERO_PROFESOR");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

                entity.Property(e => e.CorreoProfesor)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoProfesor");

                entity.HasOne(d => d.CorreoProfesorNavigation)
                    .WithMany(p => p.TableroProfesors)
                    .HasForeignKey(d => d.CorreoProfesor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO_P__corre__3BFFE745");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.TableroProfesors)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO_PROFESOR__3B0BC30C");
            });

            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreEstado, e.Nombre })
                    .HasName("PK__TAREA__270F8340F1AA7547");

                entity.ToTable("TAREA");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

                entity.Property(e => e.NombreEstado)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreEstado");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.FechaFinalizacion)
                    .HasColumnType("date")
                    .HasColumnName("fechaFinalizacion");

                entity.Property(e => e.FechaInicio)
                    .HasColumnType("date")
                    .HasColumnName("fechaInicio");

                entity.HasOne(d => d.Estado)
                    .WithMany(p => p.Tareas)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero, d.NombreEstado })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA__36470DEF");
            });

            modelBuilder.Entity<TareaDependencium>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreEstado, e.NombreTarea })
                    .HasName("PK__TAREA_DE__9572CACBD0D1FD26");

                entity.ToTable("TAREA_DEPENDENCIA");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

                entity.Property(e => e.NombreEstado)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreEstado");

                entity.Property(e => e.NombreTarea)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTarea");

                entity.Property(e => e.NombreTareaDependiente)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTareaDependiente");

                entity.HasOne(d => d.Tarea)
                    .WithOne(p => p.TareaDependencium)
                    .HasForeignKey<TareaDependencium>(d => new { d.CorreoEstudiante, d.NombreTablero, d.NombreEstado, d.NombreTarea })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA_DEPENDENCI__3CF40B7E");
            });

            modelBuilder.Entity<TareaEstudiante>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreEstado, e.NombreTarea, e.CorreoResponsable })
                    .HasName("PK__TAREA_ES__1B60A5519A44376C");

                entity.ToTable("TAREA_ESTUDIANTE");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

                entity.Property(e => e.NombreEstado)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreEstado");

                entity.Property(e => e.NombreTarea)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTarea");

                entity.Property(e => e.CorreoResponsable)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoResponsable");

                entity.HasOne(d => d.CorreoResponsableNavigation)
                    .WithMany(p => p.TareaEstudiantes)
                    .HasForeignKey(d => d.CorreoResponsable)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA_EST__corre__382F5661");

                entity.HasOne(d => d.Tarea)
                    .WithMany(p => p.TareaEstudiantes)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero, d.NombreEstado, d.NombreTarea })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA_ESTUDIANTE__373B3228");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
