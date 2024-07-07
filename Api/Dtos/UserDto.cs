using Api.Entities;
using Api.Entities.Cards;

namespace Api.Dtos;

public class UserDto
{
    public string Id { get; set; }
    public string Role { get; set; }
    public string Name { get; set; }
    public bool IsAuthenticated { get; set; }
}