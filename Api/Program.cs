using Api.Context;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddControllersAsServices().AddNewtonsoftJson(config =>
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


var app = builder.Build();

app.MapControllers();

app.Run();
