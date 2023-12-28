using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace WebExtractor;

public static class DependencyInjection
{
  public static IServiceCollection AddDatabase(this IServiceCollection services,
    Action<DbContextOptionsBuilder> configure)
  {
    services.AddDbContext<DataContext>(configure);
    // TODO: add services
    //services.AddScoped<Gateway, Repository>();
    return services;
  }
}