using Api.Context;
using Api.Dtos;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

public class DecksController : BaseController
{
    private readonly PracticeItDbContext _dbContext;

    public DecksController(PracticeItDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct)
    {
        var decks = await _dbContext.DecksOfCards
            .ProjectToType<DecksResult>()
            .AsSplitQuery()
            .AsNoTracking()
            .ToListAsync(ct);
        return Ok(decks);
    }
}
