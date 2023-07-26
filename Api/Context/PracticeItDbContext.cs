using Api.Entities;
using System.Reflection;
using Api.Entities.Cards;
using Microsoft.EntityFrameworkCore;
using NodaTime;

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

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var now = Instant.FromDateTimeOffset(DateTimeOffset.Now);
        var addedOrModifiedEntries = ChangeTracker.Entries().Where(x => x.State == EntityState.Added || x.State == EntityState.Modified);
        foreach (var entry in addedOrModifiedEntries)
        {
            if (entry.Entity is ITimeStamp timeStamp && timeStamp.CreatedAt == default)
            {
                timeStamp.CreatedAt = now;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
