using NodaTime;

namespace Api.Entities.Cards;

public class Deck : ITimeStamp, IUser
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public ICollection<Card> Cards { get; set; }
    public Instant CreatedAt { get; set; }
    public bool IsPrivate { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}
