using Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Api.Context;

public class PracticeItDbContext : DbContext
{

    public PracticeItDbContext(DbContextOptions dbContextOptions, IConfiguration configuration) : base(dbContextOptions)
    {

    }

    public DbSet<Card> Cards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
