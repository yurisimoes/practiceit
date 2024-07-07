using Api.Context;
using Api.Controllers;
using Api.Dtos;
using Api.Entities.Cards;
using FluentAssertions;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiTests;

public class DecksControllerTest : IDisposable
{
    private PracticeItDbContext _dbContext;
    private DecksController _controller;
    private CancellationToken _cancellationToken;

    public DecksControllerTest()
    {
        var optionsBuilder = new DbContextOptionsBuilder();
        optionsBuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());
        _dbContext = new PracticeItDbContext(optionsBuilder.Options);
        _dbContext.Database.EnsureCreated();
        _controller = new DecksController(_dbContext);
        _cancellationToken = CancellationToken.None;
    }

    [Fact]
    public async Task GetDeck()
    {
        await DeckFixture();
        //TODO: apply search
        // var result = await _controller.Get(_cancellationToken);
        // var decks = (result as OkObjectResult)?.Value as ICollection<DecksResult>;
        // decks.Should().NotBeNull();
        // decks!.Count.Should().Be(1);
    }
    
    [Fact]
    public async Task GetDecks()
    {
        await DecksFixure();
        //TODO: apply search
        // var result = await _controller.Get(_cancellationToken);
        // var decks = (result as OkObjectResult)?.Value as ICollection<DecksResult>;
        // decks.Should().NotBeNull();
        // decks!.Count.Should().Be(2);
    }

    private async Task<Deck> DeckFixture()
    {
        var d = new Deck
        {
            Id = default,
            Title = "TestDeck",
            Description = "Description",
            Cards = new List<Card>
            {
                new()
                {
                    Id = default,
                    Key = "あ",
                    Value = "a",
                    DeckId = default
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
            Id = default,
            Title = "TestDeck",
            Description = "Description",
            Cards = new List<Card>
            {
                new()
                {
                    Id = default,
                    Key = "あ",
                    Value = "a",
                    DeckId = default
                }
            }
        };
        var d2 = new Deck
        {
            Id = default,
            Title = "TestDeck",
            Description = "Description",
            Cards = new List<Card>
            {
                new()
                {
                    Id = default,
                    Key = "い",
                    Value = "i",
                    DeckId = default
                },
                new()
                {
                    Id = default,
                    Key = "う",
                    Value = "u",
                    DeckId = default
                },
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
