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

        public virtual DbSet<Administrador> Administradors { get; set; }
        public virtual DbSet<Estado> Estados { get; set; }
        public virtual DbSet<Estudiante> Estudiantes { get; set; }
        public virtual DbSet<EstudianteAmigo> EstudianteAmigos { get; set; }
        public virtual DbSet<EstudianteTablero> EstudianteTableros { get; set; }
        public virtual DbSet<Notificacion> Notificacions { get; set; }
        public virtual DbSet<Profesor> Profesors { get; set; }
        public virtual DbSet<Solicitud> Solicituds { get; set; }
        public virtual DbSet<Tablero> Tableros { get; set; }
        public virtual DbSet<TableroProfesor> TableroProfesors { get; set; }
        public virtual DbSet<Tarea> Tareas { get; set; }
        public virtual DbSet<TareaDependencium> TareaDependencia { get; set; }
        public virtual DbSet<TareaEstudiante> TareaEstudiantes { get; set; }
        public virtual DbSet<TipoTablero> TipoTableros { get; set; }
        public virtual DbSet<TipoTableroEstado> TipoTableroEstados { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Administrador>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__ADMINIST__A0764CD037F690DC");

                entity.ToTable("ADMINISTRADOR");

                entity.Property(e => e.CorreoInstitucional)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoInstitucional");

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

            modelBuilder.Entity<Estado>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.Id })
                    .HasName("PK__ESTADO__03A8CF86D4F8A0F3");

                entity.ToTable("ESTADO");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.Estados)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTADO__475C8B58");
            });

            modelBuilder.Entity<Estudiante>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__ESTUDIAN__A0764CD0AAED4B51");

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
                    .HasMaxLength(100)
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
                    .HasName("PK__ESTUDIAN__43D4BA4511DA7A6C");

                entity.ToTable("ESTUDIANTE_AMIGO");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.CorreoAmigo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoAmigo");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.HasOne(d => d.CorreoAmigoNavigation)
                    .WithMany(p => p.EstudianteAmigoCorreoAmigoNavigations)
                    .HasForeignKey(d => d.CorreoAmigo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__4C214075");

                entity.HasOne(d => d.CorreoEstudianteNavigation)
                    .WithMany(p => p.EstudianteAmigoCorreoEstudianteNavigations)
                    .HasForeignKey(d => d.CorreoEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__4B2D1C3C");
            });

            modelBuilder.Entity<EstudianteTablero>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.CorreoColaborador })
                    .HasName("PK__ESTUDIAN__69230B3D79B2E735");

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
                    .HasConstraintName("FK__ESTUDIANT__corre__50E5F592");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.EstudianteTableros)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANTE_TABLE__4FF1D159");
            });

            modelBuilder.Entity<Notificacion>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.CorreoEstudiante })
                    .HasName("PK__NOTIFICA__03849E9A76AF1A72");

                entity.ToTable("NOTIFICACION");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.HasOne(d => d.CorreoEstudianteNavigation)
                    .WithMany(p => p.Notificacions)
                    .HasForeignKey(d => d.CorreoEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__NOTIFICAC__corre__51DA19CB");
            });

            modelBuilder.Entity<Profesor>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__PROFESOR__A0764CD03EF919A1");

                entity.ToTable("PROFESOR");

                entity.Property(e => e.CorreoInstitucional)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoInstitucional");

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

            modelBuilder.Entity<Solicitud>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEmisor, e.CorreoReceptor })
                    .HasName("PK__SOLICITU__1D316502191C6763");

                entity.ToTable("SOLICITUD");

                entity.Property(e => e.CorreoEmisor)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEmisor");

                entity.Property(e => e.CorreoReceptor)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoReceptor");

                entity.Property(e => e.Estado)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("estado");

                entity.HasOne(d => d.CorreoEmisorNavigation)
                    .WithMany(p => p.SolicitudCorreoEmisorNavigations)
                    .HasForeignKey(d => d.CorreoEmisor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__SOLICITUD__corre__52CE3E04");

                entity.HasOne(d => d.CorreoReceptorNavigation)
                    .WithMany(p => p.SolicitudCorreoReceptorNavigations)
                    .HasForeignKey(d => d.CorreoReceptor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__SOLICITUD__corre__53C2623D");
            });

            modelBuilder.Entity<Tablero>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.Nombre })
                    .HasName("PK__TABLERO__7E2DD21EA593C9B8");

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

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("date")
                    .HasColumnName("fechaCreacion");

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("tipo");

                entity.HasOne(d => d.CorreoEstudianteNavigation)
                    .WithMany(p => p.Tableros)
                    .HasForeignKey(d => d.CorreoEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO__correoE__457442E6");

                entity.HasOne(d => d.TipoNavigation)
                    .WithMany(p => p.Tableros)
                    .HasForeignKey(d => d.Tipo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO__tipo__4668671F");
            });

            modelBuilder.Entity<TableroProfesor>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.CorreoProfesor })
                    .HasName("PK__TABLERO___EE46085EEAE89B7F");

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
                    .HasConstraintName("FK__TABLERO_P__corre__4E0988E7");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.TableroProfesors)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO_PROFESOR__4D1564AE");
            });

            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.Nombre })
                    .HasName("PK__TAREA__C3E874D6515B4CCD");

                entity.ToTable("TAREA");

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
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero, d.IdEstado })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA__4850AF91");
            });

            modelBuilder.Entity<TareaDependencium>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreTarea, e.NombreTareaDependiente })
                    .HasName("PK__TAREA_DE__BEA94CC44D779541");

                entity.ToTable("TAREA_DEPENDENCIA");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

                entity.Property(e => e.NombreTarea)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTarea");

                entity.Property(e => e.NombreTareaDependiente)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTareaDependiente");

                entity.HasOne(d => d.Tarea)
                    .WithMany(p => p.TareaDependencia)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero, d.NombreTarea })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA_DEPENDENCI__4EFDAD20");
            });

            modelBuilder.Entity<TareaEstudiante>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreTarea, e.CorreoResponsable })
                    .HasName("PK__TAREA_ES__051A15C5D7FB39B0");

                entity.ToTable("TAREA_ESTUDIANTE");

                entity.Property(e => e.CorreoEstudiante)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoEstudiante");

                entity.Property(e => e.NombreTablero)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTablero");

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
                    .HasConstraintName("FK__TAREA_EST__corre__4A38F803");

                entity.HasOne(d => d.Tarea)
                    .WithMany(p => p.TareaEstudiantes)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero, d.NombreTarea })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA_ESTUDIANTE__4944D3CA");
            });

            modelBuilder.Entity<TipoTablero>(entity =>
            {
                entity.HasKey(e => e.Nombre)
                    .HasName("PK__TIPO_TAB__72AFBCC74F5286CE");

                entity.ToTable("TIPO_TABLERO");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<TipoTableroEstado>(entity =>
            {
                entity.HasKey(e => new { e.NombreTipo, e.NombreEstado })
                    .HasName("PK__TIPO_TAB__8C665CF89C9C29A6");

                entity.ToTable("TIPO_TABLERO_ESTADO");

                entity.Property(e => e.NombreTipo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTipo");

                entity.Property(e => e.NombreEstado)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreEstado");

                entity.HasOne(d => d.NombreTipoNavigation)
                    .WithMany(p => p.TipoTableroEstados)
                    .HasForeignKey(d => d.NombreTipo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TIPO_TABL__nombr__54B68676");
            });

            modelBuilder.Entity<BuscarAmigoView>().HasNoKey().ToView(null);
            modelBuilder.Entity<BuscarEstudiantesView>().HasNoKey().ToView(null);
            modelBuilder.Entity<MisTablerosView>().HasNoKey().ToView(null);
            modelBuilder.Entity<ColaboradoresView>().HasNoKey().ToView(null);
            modelBuilder.Entity<TareaView>().HasNoKey().ToView(null);
            modelBuilder.Entity<TareaSimpleView>().HasNoKey().ToView(null);
            modelBuilder.Entity<UltimosAmigosView>().HasNoKey().ToView(null);
            modelBuilder.Entity<TablerosXmesView>().HasNoKey().ToView(null);
            modelBuilder.Entity<TareaCPMView>().HasNoKey().ToView(null);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
