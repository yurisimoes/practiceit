using Api.Context;
using Api.Dtos;
using Api.Pagination;
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
    public async Task<IActionResult> Get([FromQuery] string? search, CancellationToken ct, [FromQuery] int page = 1, [FromQuery] int perPage = 30)
    {
        search = search?.ToLower();
        var decks = _dbContext.DecksOfCards.AsSplitQuery().AsNoTracking().OrderByDescending(x => x.CreatedAt).Include(x => x.Cards).AsQueryable();
        if (!string.IsNullOrEmpty(search))
        {
            decks = decks.Where(x => x.Title.ToLower().Contains(search));
        }
        return Ok(await decks.ProjectToType<DecksResult>().Paginate(ct, page, perPage));
    }
}
