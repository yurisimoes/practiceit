using Api.Context;
using Api.Controllers;
using Api.Dtos.Cards;
using Api.Entities.Cards;
using FluentAssertions;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiTests;

public class DecksOfCardsControllerTest : IDisposable
{
    private PracticeItDbContext _dbContext;
    private DecksOfCardsController _controller;
    private CancellationToken _cancellationToken;

    public DecksOfCardsControllerTest()
    {
        var optionsBuilder = new DbContextOptionsBuilder();
        optionsBuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());
        _dbContext = new PracticeItDbContext(optionsBuilder.Options);
        _dbContext.Database.EnsureCreated();
        _controller = new DecksOfCardsController(_dbContext);
        _cancellationToken = CancellationToken.None;
    }

    [Fact]
    public async Task Post()
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
                },
                new()
                {
                    Id = default,
                    Key = "い",
                    Value = "i",
                    DeckId = default
                }
            }
        };

        await _controller.Post(d.Adapt<DeckDto>(), _cancellationToken);
        var deck = await _dbContext.DecksOfCards.Include(x => x.Cards).FirstOrDefaultAsync();
        deck.Should().NotBeNull();
        deck.Cards.Count().Should().Be(2);
        deck.Cards.First(x => x.Id == 2).DeckId.Should().Be(1);
        deck.Cards.First().DeckId.Should().Be(1);
    }

    [Fact]
    public async Task Get()
    {
        await DecksFixure();
        var result = await _controller.Get(_cancellationToken);
        var decks = (result as OkObjectResult)?.Value as ICollection<Deck>;
        decks.Should().NotBeNull();
        decks.Count().Should().Be(2);
        decks.First().Title.Should().Be("TestDeck");
    }

    [Fact]
    public async Task Get_Cancellation()
    {
        await DeckFixure();
        using (var ct = new CancellationTokenSource())
        {
            ct.Cancel();
            await FluentActions.Awaiting(async () => await _controller.Get(ct.Token))
                .Should().ThrowAsync<OperationCanceledException>();
        }
    }

    [Fact]
    public async Task GetById()
    {
        await DeckFixure();
        var result = await _controller.GetById(1, _cancellationToken);
        var deck = (result as OkObjectResult)?.Value as Deck;
        deck.Should().NotBeNull();
        deck.Id.Should().Be(1);
        deck.Cards.First().DeckId.Should().Be(1);
    }

    [Fact]
    public async Task Put()
    {
        var deck = DeckFixure();
        var dto = deck.Adapt<DeckDto>();
        dto.Title = "NewTitle";
        await _controller.Put(deck.Id, dto, _cancellationToken);
    }

    [Fact]
    public async Task Delete()
    {
        var deck = await DeckFixure();
        await _controller.Delete(-1, _cancellationToken);
        _dbContext.DecksOfCards.Count().Should().Be(1);
        await _controller.Delete(deck.Id, _cancellationToken);
        _dbContext.DecksOfCards.Count().Should().Be(0);
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
                }
            }
        };
        _dbContext.DecksOfCards.AddRange(d1, d2);
        await _dbContext.SaveChangesAsync();
    }

    private async Task<Deck> DeckFixure()
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

    public void Dispose()
    {
        _dbContext.Database.EnsureDeleted();
    }
}
