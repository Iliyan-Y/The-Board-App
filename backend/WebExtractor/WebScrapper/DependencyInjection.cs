using Microsoft.Extensions.DependencyInjection;
using WebExtractor.WebScrapper;


namespace WebExtractor;


public static class DependencyInjection
{
  public static IServiceCollection AddWebScrapper(this IServiceCollection services)
  {
    services.AddScoped<WebScrapperGateway, WebScrapper.WebScrapper>();
    return services;
  }
}

// marker class for assembly scanning
public sealed class WebScrapperAssembly { }