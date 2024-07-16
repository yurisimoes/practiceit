using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Api.Services;

public class UserService : IUserService, IService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int? UserId
    {
        get
        {
            var id = ClaimCurrentUser(JwtRegisteredClaimNames.Sub);
            return id.ToInt();
        }
    }

    public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User.Identity.IsAuthenticated ?? false;

    public bool IsAdmin => HasRole("Admin");

    public string? Name => _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name)!;

    public string ClaimCurrentUser(string claimName)
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(claimName);
    }

    public IEnumerable<string> ClaimsCurrentUser(string claimName)
    {
        return _httpContextAccessor.HttpContext.User.FindAll(x => x.Type == ClaimTypes.Role).Select(x => x.Value);
    }
    
    private bool HasRole(string role)
    {
        return ClaimsCurrentUser(role).Any(x => x == role);
    }
}