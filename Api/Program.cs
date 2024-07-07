using System.IdentityModel.Tokens.Jwt;
using Api.Context;
using Api.Dtos;
using Api.Entities.Cards;
using Api.Extensions;
using Api.Services;
using Mapster;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using NodaTime;

var builder = WebApplication.CreateBuilder(args);

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder.Services
    .AddHttpClient()
    .AddMemoryCache()
    .AddControllers(x => x.SlugifyRouteName())
    .AddControllersAsServices()
    .AddNewtonsoftJson(
        config =>
        {
            config.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            config.SerializerSettings.Converters.Add(new StringEnumConverter
            {
                NamingStrategy = new KebabCaseNamingStrategy()
            });
            config.SerializerSettings.ContractResolver = new DefaultContractResolver
            {
                IgnoreIsSpecifiedMembers = true,
                NamingStrategy = new CamelCaseNamingStrategy
                {
                    ProcessDictionaryKeys = true
                }
            };
        });

builder.Services.AddAuthentication(opts =>
    {
        opts.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        opts.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie(opts =>
    {
        opts.Cookie.HttpOnly = true;
        opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        opts.Cookie.SameSite = SameSiteMode.Strict;
        opts.Cookie.Name = "PracticeIt__Auth";
        opts.ExpireTimeSpan = TimeSpan.FromDays(1);
        opts.SlidingExpiration = true;
    });

builder.Services.Scan(x =>
    x.FromAssemblyOf<IService>()
        .AddClasses(y => y.AssignableTo<IService>())
        .AsImplementedInterfaces()
        .WithScopedLifetime());

builder.Services.AddHttpContextAccessor();

builder.Services.AddDbContext<PracticeItDbContext>(context =>
{
    context
        .UseNpgsql(builder.Configuration.GetConnectionString("default"), o => o.UseNodaTime())
        .UseSnakeCaseNamingConvention();
});

builder.Services.AddSingleton<IClock>(SystemClock.Instance);

TypeAdapterConfig.GlobalSettings.AllowImplicitDestinationInheritance = true;
TypeAdapterConfig<Deck, DecksResult>
    .ForType()
    .Map(dest => dest.Title, src => src.Title)
    .Map(dest => dest.Description, src => src.Description)
    .Map(dest => dest.CardsCount, src => src.Cards.Count)
    .Map(dest => dest.UserId, src => src.UserId)
    .Map(dest => dest.Username, src => src.User.Name);


var app = builder.Build();

using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
var dbContext = serviceScope.ServiceProvider.GetService<PracticeItDbContext>();
dbContext?.Database.Migrate();
// PracticeItDbSeeder.Seed(dbContext);

app.MapControllers();

app.Run();