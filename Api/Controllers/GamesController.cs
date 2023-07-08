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
    public async Task<IActionResult> GetGame([FromBody] int[] ids, CancellationToken ct)
    {
        var decks = _dbContext.DecksOfCards
            .AsQueryable()
            .AsNoTracking()
            .Include(x => x.Cards)
            .Where(deck => ids.Any(deckId => deckId == deck.Id))
            .ToListAsync(ct);
        return Ok(await decks);
    }
}
