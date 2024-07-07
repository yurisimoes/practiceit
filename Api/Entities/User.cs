using Api.Entities.Cards;

namespace Api.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public Role Role { get; set; } = Role.Member;
    public string GoogleId { get; set; }

    public User(string email, string name, string googleId)
    {
        Email = email;
        Name = name;
        GoogleId = googleId;
    }
}

public enum Role
{
    Member,
    Admin
}