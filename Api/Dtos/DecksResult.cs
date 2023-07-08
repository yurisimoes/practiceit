
namespace Api.Dtos;

public class DecksResult
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public int CardsCount { get; set; }
}
