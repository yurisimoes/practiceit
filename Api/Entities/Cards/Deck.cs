namespace Api.Entities.Cards;

public class Deck
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public ICollection<Card> Cards { get; set; }
}
