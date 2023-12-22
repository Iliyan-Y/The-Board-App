using Microsoft.Extensions.DependencyInjection;
using WebExtractor.WebScrapper;

namespace WebExtractor;


public static class DependencyInjection
{
  public static IServiceCollection AddDomain(this IServiceCollection services)
  {
    services.AddScoped<IWebScrapperService, WebScrapperService>();
    return services;
  }
}

// marker class for assembly scanning
public sealed class Domain { }