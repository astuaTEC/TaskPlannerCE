﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskPlannerCE_API.Models;

namespace TaskPlannerCE_API.Repositories
{
    public class TareaRepo
    {
        private readonly TaskPlannerCEDBContext _context;

        // Inject the Data Base Context
        public TareaRepo(TaskPlannerCEDBContext context)
        {
            _context = context;
        }

    }
}