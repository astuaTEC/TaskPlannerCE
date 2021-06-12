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
                    .HasName("PK__ADMINIST__A0764CD0BCA2E37D");

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
                    .HasName("PK__ESTADO__03A8CF8634B1B23B");

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
                    .HasConstraintName("FK__ESTADO__6462DE5A");
            });

            modelBuilder.Entity<Estudiante>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__ESTUDIAN__A0764CD0105BE411");

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
                    .HasName("PK__ESTUDIAN__43D4BA454C50CE3C");

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
                    .HasConstraintName("FK__ESTUDIANT__corre__69279377");

                entity.HasOne(d => d.CorreoEstudianteNavigation)
                    .WithMany(p => p.EstudianteAmigoCorreoEstudianteNavigations)
                    .HasForeignKey(d => d.CorreoEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANT__corre__68336F3E");
            });

            modelBuilder.Entity<EstudianteTablero>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.CorreoColaborador })
                    .HasName("PK__ESTUDIAN__69230B3DFE5E5FF4");

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
                    .HasConstraintName("FK__ESTUDIANT__corre__6DEC4894");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.EstudianteTableros)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANTE_TABLE__6CF8245B");
            });

            modelBuilder.Entity<Notificacion>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.CorreoEstudiante })
                    .HasName("PK__NOTIFICA__03849E9AFA112FEC");

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
                    .HasConstraintName("FK__NOTIFICAC__corre__6EE06CCD");
            });

            modelBuilder.Entity<Profesor>(entity =>
            {
                entity.HasKey(e => e.CorreoInstitucional)
                    .HasName("PK__PROFESOR__A0764CD0C06AD495");

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
                    .HasName("PK__SOLICITU__1D3165020D2BCDE2");

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
                    .HasConstraintName("FK__SOLICITUD__corre__6FD49106");

                entity.HasOne(d => d.CorreoReceptorNavigation)
                    .WithMany(p => p.SolicitudCorreoReceptorNavigations)
                    .HasForeignKey(d => d.CorreoReceptor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__SOLICITUD__corre__70C8B53F");
            });

            modelBuilder.Entity<Tablero>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.Nombre })
                    .HasName("PK__TABLERO__7E2DD21E22900DAB");

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
                    .HasConstraintName("FK__TABLERO__correoE__627A95E8");

                entity.HasOne(d => d.TipoNavigation)
                    .WithMany(p => p.Tableros)
                    .HasForeignKey(d => d.Tipo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO__tipo__636EBA21");
            });

            modelBuilder.Entity<TableroProfesor>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.CorreoProfesor })
                    .HasName("PK__TABLERO___EE46085E1BA1DC91");

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
                    .HasConstraintName("FK__TABLERO_P__corre__6B0FDBE9");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.TableroProfesors)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TABLERO_PROFESOR__6A1BB7B0");
            });

            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.Nombre })
                    .HasName("PK__TAREA__C3E874D6EAFEF74A");

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
                    .HasConstraintName("FK__TAREA__65570293");
            });

            modelBuilder.Entity<TareaDependencium>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreTarea })
                    .HasName("PK__TAREA_DE__E43CEC6D9796F357");

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
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreTareaDependiente");

                entity.HasOne(d => d.Tarea)
                    .WithOne(p => p.TareaDependencium)
                    .HasForeignKey<TareaDependencium>(d => new { d.CorreoEstudiante, d.NombreTablero, d.NombreTarea })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA_DEPENDENCI__6C040022");
            });

            modelBuilder.Entity<TareaEstudiante>(entity =>
            {
                entity.HasKey(e => new { e.CorreoEstudiante, e.NombreTablero, e.NombreTarea, e.CorreoResponsable })
                    .HasName("PK__TAREA_ES__051A15C531B310AF");

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
                    .HasConstraintName("FK__TAREA_EST__corre__673F4B05");

                entity.HasOne(d => d.Tarea)
                    .WithMany(p => p.TareaEstudiantes)
                    .HasForeignKey(d => new { d.CorreoEstudiante, d.NombreTablero, d.NombreTarea })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TAREA_ESTUDIANTE__664B26CC");
            });

            modelBuilder.Entity<TipoTablero>(entity =>
            {
                entity.HasKey(e => e.Nombre)
                    .HasName("PK__TIPO_TAB__72AFBCC7E4402FD3");

                entity.ToTable("TIPO_TABLERO");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<TipoTableroEstado>(entity =>
            {
                entity.HasKey(e => new { e.NombreTipo, e.NombreEstado })
                    .HasName("PK__TIPO_TAB__8C665CF8231DFB22");

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
                    .HasConstraintName("FK__TIPO_TABL__nombr__71BCD978");
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
