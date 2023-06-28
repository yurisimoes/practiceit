using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System.Text.RegularExpressions;

namespace Api.Extensions;

public static class ControllerExtensions
{
    public static void SlugifyRouteName(this MvcOptions options)
    {
        options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()));
    }
}

public class SlugifyParameterTransformer : IOutboundParameterTransformer
{

    public string? TransformOutbound(object? value)
    {
        return Regex.Replace(
                value.ToString() ?? string.Empty,
                "([a-z])([A-Z])",
                "$1-$2")
            .ToLower();
    }
}
