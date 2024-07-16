using Api.Entities;
using Api.Entities.Cards;

namespace Api.Dtos;

public class UserDto
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public bool IsAuthenticated { get; set; }
}