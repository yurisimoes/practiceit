using NodaTime;

namespace Api.Entities;

public interface ITimeStamp
{
    public Instant CreatedAt { get; set; }
}
