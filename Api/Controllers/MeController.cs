using System.Security.Claims;
using Api.Dtos;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Api.Controllers;

public class MeController : BaseController
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUserService _userService;

    public MeController(IHttpContextAccessor httpContextAccessor, IUserService userService)
    {
        _httpContextAccessor = httpContextAccessor;
        _userService = userService;
    }

    [HttpGet]
    public UserDto Get()
    {
        var currentUser = new UserDto
        {
            Id = _httpContextAccessor.HttpContext!.User.FindFirstValue(JwtRegisteredClaimNames.Sub)!,
            Role = _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Role)!,
            Name = _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name)!,
            IsAuthenticated = _userService.IsAuthenticated
        };
        return currentUser;
    }
}