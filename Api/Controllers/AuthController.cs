using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Api.Context;
using Api.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using NodaTime;

namespace Api.Controllers;

public class AuthController : BaseController
{
    private readonly PracticeItDbContext _dbContext;
    private readonly IClock _clock;
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpFactory;
    private readonly IMemoryCache _cache;
    private const string CacheKey = "google_jwks";

    public AuthController(
        PracticeItDbContext dbContext, 
        IClock clock, 
        IConfiguration configuration, 
        IHttpClientFactory httpFactory, 
        IMemoryCache cache)
    {
        _dbContext = dbContext;
        _clock = clock;
        _configuration = configuration;
        _httpFactory = httpFactory;
        _cache = cache;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> SignInGoogle([FromBody] Login login)
    {
        if (string.IsNullOrWhiteSpace(login.IdToken)) return BadRequest();
        
        var jwks = await GetGoogleKeys();
        var validationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            RequireSignedTokens = true,
            ValidIssuers = new[] { "accounts.google.com", "https://accounts.google.com" },
            ValidAudience = _configuration["OAuth:Google:ClientId"],
            ValidAlgorithms = new[] { "RS256" },
            IssuerSigningKeys = jwks.GetSigningKeys()
        };
        
        var handler = new JwtSecurityTokenHandler();
        var result = await handler.ValidateTokenAsync(login.IdToken, validationParameters);
        if (!result.IsValid) return BadRequest();

        var email = result.ClaimsIdentity.FindFirst(JwtRegisteredClaimNames.Email)?.Value;
        var name = result.ClaimsIdentity.FindFirst(JwtRegisteredClaimNames.Name)?.Value;
        var googleId = result.ClaimsIdentity.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        if (name == null || email == null || googleId == null) return BadRequest();
        
        var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        
        if (user == null)
        {
            user = new User(email, name, googleId);
            _dbContext.Add(user);
            await _dbContext.SaveChangesAsync();
        }
        
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(ClaimTypes.Role, user.Role.ToString()),
            new(ClaimTypes.Name, user.Name)
        };
        
        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        return Ok();
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GoogleSignOut()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return NoContent();
    }

    public async Task<JsonWebKeySet> GetGoogleKeys()
    {
        if (_cache.TryGetValue<JsonWebKeySet>(CacheKey, out var jwks))
            return jwks!;
        var http = _httpFactory.CreateClient();
        var res = await http.SendAsync(new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri("https://www.googleapis.com/oauth2/v3/certs")
        });
        var maxAge = res.Headers.CacheControl?.MaxAge ?? TimeSpan.FromHours(1);
        var body = await res.Content.ReadAsStringAsync();
        jwks = new JsonWebKeySet(body);
        _cache.Set(CacheKey, jwks, DateTimeOffset.Now.Add(maxAge));
        return jwks;
    }
}

public class Login
{
    public string IdToken { get; set; }
}