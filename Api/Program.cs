using Api.Context;
using Api.Dtos;
using Api.Entities.Cards;
using Api.Extensions;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services
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

builder.Services.AddHttpContextAccessor();

builder.Services.AddDbContext<PracticeItDbContext>(context =>
{
    context.UseNpgsql(builder.Configuration.GetConnectionString("default")).UseSnakeCaseNamingConvention();
});

TypeAdapterConfig.GlobalSettings.AllowImplicitDestinationInheritance = true;
TypeAdapterConfig<Deck, DecksResult>
    .ForType()
    .Map(dest => dest.Title, src => src.Title)
    .Map(dest => dest.Description, src => src.Description)
    .Map(dest => dest.CardsCount, src => src.Cards.Count);


var app = builder.Build();

using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
var dbContext = serviceScope.ServiceProvider.GetService<PracticeItDbContext>();
dbContext?.Database.Migrate();

app.MapControllers();

app.Run();
