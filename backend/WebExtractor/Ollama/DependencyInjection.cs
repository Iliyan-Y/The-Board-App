﻿using Microsoft.Extensions.DependencyInjection;
using WebExtractor.AI;
using WebExtractor.Ollama;

namespace WebExtractor;

public static class DependencyInjection
{
  public static IServiceCollection AddAi(this IServiceCollection services, AiConfig config)
  {
    services.AddScoped<AIGateway>(provider =>
    {
      var client = new HttpClient
      {
        BaseAddress = new Uri(config.BaseAddress),
        // LLM calculation can take longer on local machine
        // adjust the timeout per the uncase
        Timeout = TimeSpan.FromMinutes(5)
      };
      return new OpenAiService(client, config.Model);
    });
    return services;
  }
}
