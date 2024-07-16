using Api.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

public class GamesController : BaseController
{
    private readonly PracticeItDbContext _dbContext;

    public GamesController(PracticeItDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> GetGames([FromBody] int[] ids, CancellationToken ct)
    {
        if (!ids.Any())
        {
            return NotFound();
        }
        
        var decks = _dbContext.DecksOfCards
            .Where(deck => ids.Contains(deck.Id))
            .Include(x => x.Cards)
            .AsSplitQuery()
            .AsNoTracking()
            .ToListAsync(ct);
        return Ok(await decks);
    }
}
