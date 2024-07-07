using Api.Entities;
using System.Reflection;
using System.Security.Authentication;
using Api.Entities.Cards;
using Api.Services;
using Microsoft.EntityFrameworkCore;
using NodaTime;

namespace Api.Context;

public class PracticeItDbContext : DbContext
{
    private readonly IUserService _userService;

    public PracticeItDbContext(DbContextOptions dbContextOptions, IUserService userService) : base(dbContextOptions)
    {
        _userService = userService;
    }

    public DbSet<Card> Cards { get; set; }
    public DbSet<Deck> DecksOfCards { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var now = Instant.FromDateTimeOffset(DateTimeOffset.Now);
        var addedOrModifiedEntries = ChangeTracker.Entries()
            .Where(x => x.State == EntityState.Added || x.State == EntityState.Modified);
        foreach (var entry in addedOrModifiedEntries)
        {
            if (entry.Entity is ITimeStamp timeStamp && timeStamp.CreatedAt == default) 
                timeStamp.CreatedAt = now;

            if (entry.Entity is IUser user && user.UserId == default) 
                user.UserId = _userService.UserId ?? throw new AuthenticationException();
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}