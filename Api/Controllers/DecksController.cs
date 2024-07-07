using Api.Context;
using Api.Dtos;
using Api.Pagination;
using Api.Services;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

public class DecksController : BaseController
{
    private readonly PracticeItDbContext _dbContext;
    private readonly IUserService _userService;

    public DecksController(PracticeItDbContext dbContext, IUserService userService)
    {
        _dbContext = dbContext;
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? search, CancellationToken ct, [FromQuery] int page = 1, [FromQuery] int perPage = 30)
    {
        search = search?.ToLower();
        var decks = _dbContext.DecksOfCards
            .AsSplitQuery()
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Include(x => x.Cards)
            .Where(x => !x.IsPrivate)
            .AsQueryable();
        if (!string.IsNullOrEmpty(search))
        {
            decks = decks.Where(x => x.Title.ToLower().Contains(search));
        }
        return Ok(await decks.ProjectToType<DecksResult>().Paginate(ct, page, perPage));
    }
    
    [HttpGet("[action]")]
    public async Task<IActionResult> PersonalDecks([FromQuery] string? search, CancellationToken ct, [FromQuery] int page = 1, [FromQuery] int perPage = 30)
    {
        search = search?.ToLower();
        var decks = _dbContext.DecksOfCards
            .AsSplitQuery()
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Include(x => x.Cards)
            .Include(x => x.User)
            .Where(x => x.UserId == _userService.UserId)
            .AsQueryable();
        if (!string.IsNullOrEmpty(search))
        {
            decks = decks.Where(x => x.Title.ToLower().Contains(search));
        }
        return Ok(await decks.ProjectToType<DecksResult>().Paginate(ct, page, perPage));
    }
    
    [HttpGet("[action]")]
    public async Task<IActionResult> OtherUserDeck([FromQuery] int userId, [FromQuery] string? search, CancellationToken ct, [FromQuery] int page = 1, [FromQuery] int perPage = 30)
    {
        search = search?.ToLower();
        var decks = _dbContext.DecksOfCards
            .AsSplitQuery()
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Include(x => x.Cards)
            .Include(x => x.User)
            .Where(x => x.UserId == userId && !x.IsPrivate)
            .AsQueryable();
        if (!string.IsNullOrEmpty(search))
        {
            decks = decks.Where(x => x.Title.ToLower().Contains(search));
        }
        return Ok(await decks.ProjectToType<DecksResult>().Paginate(ct, page, perPage));
    }
}
