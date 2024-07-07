namespace Api.Entities;

public interface IUser
{
    public int UserId { get; set; }
    public User User { get; set; }
}