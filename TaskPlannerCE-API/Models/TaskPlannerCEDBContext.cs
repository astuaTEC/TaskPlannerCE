using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TaskPlannerCE_API.Models.Views;

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
                    .HasName("PK__ESTADO__C3E874D67ADCD24A");

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
                    .HasConstraintName("FK__ESTADO__53D770D6");
            });

            modelBuilder.Entity<Estudiante>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__ESTUDIAN__A0764CD00931937F");

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
                entity.HasKey(e => new { e.CorreoEstudiante, e.CorreoAmigo })
                    .HasName("PK__ESTUDIAN__43D4BA45891AE2DE");

                entity.ToTable("ESTUDIANTE_AMIGO");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.CorreoAmigo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoAmigo");

                entity.HasOne(d => d.CorreoAmigoNavigation)
                    .WithMany(p => p.EstudianteAmigoCorreoAmigoNavigations)
                    .HasForeignKey(d => d.CorreoAmigo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__589C25F3");

                entity.HasOne(d => d.CorreoEstudianteNavigation)
                    .WithMany(p => p.EstudianteAmigoCorreoEstudianteNavigations)
                    .HasForeignKey(d => d.CorreoEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__57A801BA");
            });

            modelBuilder.Entity<EstudianteTablero>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.CorreoColaborador })
                    .HasName("PK__ESTUDIAN__69230B3D75CFA166");

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
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoColaborador");

                entity.HasOne(d => d.CorreoColaboradorNavigation)
                    .WithMany(p => p.EstudianteTableros)
                    .HasForeignKey(d => d.CorreoColaborador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__5D60DB10");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.EstudianteTableros)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANTE_TABLE__5C6CB6D7");
            });

            modelBuilder.Entity<Profesor>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__PROFESOR__A0764CD04AD8F579");

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
                    .HasName("PK__TABLERO__7E2DD21EC8437714");

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
                    .HasConstraintName("FK__TABLERO__correoE__52E34C9D");
            });

            modelBuilder.Entity<TableroProfesor>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.CorreoProfesor })
                    .HasName("PK__TABLERO___EE46085E5BBE2878");

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
                    .HasConstraintName("FK__TABLERO_P__corre__5A846E65");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.TableroProfesors)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO_PROFESOR__59904A2C");
            });

            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreEstado, e.Nombre })
                    .HasName("PK__TAREA__270F83403CE248EF");

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
                    .HasConstraintName("FK__TAREA__54CB950F");
            });

            modelBuilder.Entity<TareaDependencium>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreEstado, e.NombreTarea })
                    .HasName("PK__TAREA_DE__9572CACB35F95E27");

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
                    .HasConstraintName("FK__TAREA_DEPENDENCI__5B78929E");
            });

            modelBuilder.Entity<TareaEstudiante>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreEstado, e.NombreTarea, e.CorreoResponsable })
                    .HasName("PK__TAREA_ES__1B60A551DEE1C9DD");

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
                    .HasConstraintName("FK__TAREA_EST__corre__56B3DD81");

                entity.HasOne(d => d.Tarea)
                    .WithMany(p => p.TareaEstudiantes)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero, d.NombreEstado, d.NombreTarea })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA_ESTUDIANTE__55BFB948");
            });


            modelBuilder.Entity<BuscarAmigoView>().HasNoKey().ToView(null);
            modelBuilder.Entity<BuscarEstudiantesView>().HasNoKey().ToView(null);
            modelBuilder.Entity<MisTablerosView>().HasNoKey().ToView(null);
            modelBuilder.Entity<ColaboradoresView>().HasNoKey().ToView(null);
            modelBuilder.Entity<TareaView>().HasNoKey().ToView(null);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
