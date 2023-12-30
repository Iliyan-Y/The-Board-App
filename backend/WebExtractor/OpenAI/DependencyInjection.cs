using Microsoft.Extensions.DependencyInjection;
using WebExtractor.AI;
using WebExtractor.OpenAI;

namespace WebExtractor;

public static class DependencyInjection
{
  public static IServiceCollection AddAi(this IServiceCollection services, OpenAiConfig config)
  {
    services.AddHttpClient<OpenAiService>(client =>
           {
             client.BaseAddress = new Uri(config.BaseAddress);
             client.DefaultRequestHeaders.Add("ApiKey", config.Key);
           });
    services.AddScoped<AIGateway, OpenAiService>();
    return services;
  }
}
