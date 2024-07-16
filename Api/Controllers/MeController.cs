using System.Security.Claims;
using Api.Dtos;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Api.Controllers;

public class MeController : BaseController
{
    private readonly IUserService _userService;

    public MeController(IHttpContextAccessor httpContextAccessor, IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public UserDto Get()
    {
        var currentUser = new UserDto
        {
            Id = _userService.UserId,
            Name = _userService.Name,
            IsAuthenticated = _userService.IsAuthenticated
        };
        return currentUser;
    }
}