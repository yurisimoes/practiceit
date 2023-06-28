namespace Api.Dtos.Cards;

public class DeckDto
{
    public string Title { get; set; }
    public string? Description { get; set; }
    public ICollection<CardDto> Cards { get; set; }
}
