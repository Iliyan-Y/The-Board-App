using Microsoft.Extensions.DependencyInjection;
using WebExtractor.AI;
using WebExtractor.OpenAI;

namespace WebExtractor;

public static class DependencyInjection
{
  public static IServiceCollection AddAi(this IServiceCollection services, OpenAiConfig config)
  {
    services.AddScoped<AIGateway>(provider => new OpenAiService(config.Key));
    return services;
  }
}
