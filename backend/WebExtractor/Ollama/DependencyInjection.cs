using System.Net.Http.Headers;
using Microsoft.Extensions.DependencyInjection;
using WebExtractor.AI;
using WebExtractor.Ollama;

namespace WebExtractor;

public static class DependencyInjection
{
  public static IServiceCollection AddAi(this IServiceCollection services, AiConfig config)
  {
    // services.AddScoped<AIGateway>(provider =>
    // {
    //   var client = new HttpClient
    //   {
    //     BaseAddress = new Uri(config.BaseAddress)
    //   };
    //   client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", config.Key);
    //   return new OpenAiService(client, config.Model);
    // });
    return services;
  }
}
