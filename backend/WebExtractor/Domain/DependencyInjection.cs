using Microsoft.Extensions.DependencyInjection;

namespace WebExtractor;


public static class DependencyInjection
{
  public static IServiceCollection AddDomain(this IServiceCollection services)
  {
    return services;
  }
}

// marker class for assembly scanning
public sealed class Domain { }