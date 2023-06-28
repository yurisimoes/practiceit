namespace Api.Entities.Cards;

public class Card
{
    public int Id { get; set; }
    public string Key { get; set; }
    public string Value { get; set; }
    public int DeckId { get; set; }
}
