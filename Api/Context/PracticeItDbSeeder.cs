using Api.Entities.Cards;
using NodaTime;

namespace Api.Context;

public class PracticeItDbSeeder
{
    public static void Seed(PracticeItDbContext context)
    {
        if (context.DecksOfCards.Any())
        {
            return;
        }
        var instant = Instant.FromDateTimeOffset(DateTimeOffset.Now);

        for (int i = 1; i <= 50; i++)
        {
            int numberOfCards = 10 * i;

            Deck d = new Deck
            {
                Id = default,
                Title = "Deck " + i,
                Description = "Description of Deck " + i,
                CreatedAt = instant.Plus(Duration.FromMinutes(i)),
                Cards = new List<Card>()
            };

            // Increase the number of cards for each deck
            for (int j = 1; j <= numberOfCards; j++)
            {
                d.Cards.Add(new Card
                {
                    Id = default,
                    Key = "Question " + i + "-" + j,
                    Value = i.ToString(),
                    DeckId = default
                });
            }

            context.Add(d);
        }
        context.SaveChanges();
    }
}
