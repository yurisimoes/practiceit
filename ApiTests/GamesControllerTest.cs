using Api.Context;
using Api.Controllers;
using Api.Entities.Cards;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiTests;

public class GamesControllerTest : IDisposable
{
    private readonly PracticeItDbContext _dbContext;
    private readonly GamesController _controller;
    private CancellationToken _cancellationToken;

    public GamesControllerTest()
    {
        var optionsBuilder = new DbContextOptionsBuilder();
        optionsBuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());
        _dbContext = new PracticeItDbContext(optionsBuilder.Options);
        _dbContext.Database.EnsureCreated();
        _controller = new GamesController(_dbContext);
        _cancellationToken = CancellationToken.None;
    }

    [Fact]
    public async Task GetDeck()
    {
        await DeckFixure();
        var result = await _controller.GetGames(new[]
        {
            1
        }, _cancellationToken);
        var deck = (result as OkObjectResult)?.Value as ICollection<Deck>;
        deck.Should().NotBeNull();
        deck!.Count.Should().Be(1);
    }
    
    [Fact]
    public async Task GetDecks()
    {
        await DecksFixure();
        var result = await _controller.GetGames(new[]
        {
            1, 2
        }, _cancellationToken);
        var decks = (result as OkObjectResult)?.Value as ICollection<Deck>;
        decks.Should().NotBeNull();
        decks!.Count.Should().Be(2);
    }

    private async Task<Deck> DeckFixure()
    {
        var d = new Deck
        {
            Id = 1,
            Title = "TestDeck",
            Description = "Description",
            Cards = new List<Card>
            {
                new()
                {
                    Id = 1,
                    Key = "あ",
                    Value = "a",
                    DeckId = 1
                }
            }
        };
        _dbContext.DecksOfCards.Add(d);
        await _dbContext.SaveChangesAsync();
        return d;
    }
    
    private async Task DecksFixure()
    {
        var d1 = new Deck
        {
            Id = 1,
            Title = "TestDeck",
            Description = "Description",
            Cards = new List<Card>
            {
                new()
                {
                    Id = 1,
                    Key = "あ",
                    Value = "a",
                    DeckId = 1
                }
            }
        };
        var d2 = new Deck
        {
            Id = 2,
            Title = "TestDeck",
            Description = "Description",
            Cards = new List<Card>
            {
                new()
                {
                    Id = 2,
                    Key = "い",
                    Value = "i",
                    DeckId = 2
                }
            }
        };
        _dbContext.DecksOfCards.AddRange(d1, d2);
        await _dbContext.SaveChangesAsync();
    }

    public void Dispose()
    {
        _dbContext.Database.EnsureDeleted();
    }
}
