using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebExtractor.AI;


namespace WebExtractor;

public static class DependencyInjection
{
  public static IServiceCollection AddDatabase(this IServiceCollection services,
    Action<DbContextOptionsBuilder> configure)
  {
    services.AddDbContext<DataContext>(configure);
    services.AddScoped<DataGateway, Repository>();
    return services;
  }
}