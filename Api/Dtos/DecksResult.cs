
namespace Api.Dtos;

public class DecksResult
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public int CardsCount { get; set; }
    public int? UserId { get; set; }
    public string? Username { get; set; }
}
