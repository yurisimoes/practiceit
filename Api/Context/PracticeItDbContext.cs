using System.Reflection;
using Api.Entities.Cards;
using Microsoft.EntityFrameworkCore;

namespace Api.Context;

public class PracticeItDbContext : DbContext
{
    public PracticeItDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
    }

    public DbSet<Card> Cards { get; set; }
    public DbSet<Deck> DecksOfCards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
