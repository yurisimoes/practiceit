namespace Api.Services;

public interface IUserService
{
    int? UserId { get; }
    bool IsAdmin { get; }
    bool IsAuthenticated { get; }
    string ClaimCurrentUser(string claimName);
    IEnumerable<string> ClaimsCurrentUser(string claimName);
}