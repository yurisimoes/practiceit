using Api.Context;
using Api.Dtos.Cards;
using Api.Entities.Cards;
using Api.Services;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

public class DecksOfCardsController : BaseController
{
    private readonly PracticeItDbContext _dbContext;
    private readonly IUserService _userService;

    public DecksOfCardsController(PracticeItDbContext dbContext, IUserService userService)
    {
        _dbContext = dbContext;
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] DeckDto dto, CancellationToken ct)
    {
        var deck = dto.Adapt<Deck>();
        _dbContext.Add(deck);
        await _dbContext.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(GetById), new { id = deck.Id }, deck);
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct)
    {
        var decks = _dbContext.DecksOfCards
            .AsSplitQuery()
            .AsNoTracking()
            .Include(x => x.Cards)
            .Include(x => x.User)
            .AsQueryable();
        return Ok(await decks.ToListAsync(ct));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken ct)
    {
        var deck = await _dbContext.DecksOfCards
            .AsSplitQuery()
            .AsNoTracking()
            .AsQueryable()
            .Include(x => x.Cards)
            .FirstOrDefaultAsync(x => x.Id == id, ct);
        if (deck!.UserId != _userService.UserId)
            return Unauthorized();
        return Ok(deck);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] DeckDto dto, CancellationToken ct)
    {
        var deck = await _dbContext.DecksOfCards.AsQueryable().Include(x => x.Cards).FirstOrDefaultAsync(x => x.Id == id, ct);
        if (deck!.UserId != _userService.UserId)
            return Unauthorized();
        _dbContext.DecksOfCards.Update(dto.Adapt(deck)!);
        await _dbContext.SaveChangesAsync(ct);
        return Ok(deck);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var deck = await _dbContext.DecksOfCards.AsQueryable().FirstOrDefaultAsync(x => x.Id == id, ct);
        if (deck!.UserId != _userService.UserId)
            return Unauthorized();
        if (deck == null) return NotFound();
        _dbContext.Remove(deck);
        await _dbContext.SaveChangesAsync(ct);
        return NoContent();
    }
}
