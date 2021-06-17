using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TaskPlannerCE_API.Models;

namespace TaskPlannerCEAPI.Test
{
    public class BasePruebas
    {

        protected TaskPlannerCEDBContext ConstruirContext(string nombreDB)
        {
            var opciones = new DbContextOptionsBuilder<TaskPlannerCEDBContext>()
                .UseInMemoryDatabase(nombreDB).Options;

            var dbContext = new TaskPlannerCEDBContext(opciones);

            return dbContext;
        }
    }
}
