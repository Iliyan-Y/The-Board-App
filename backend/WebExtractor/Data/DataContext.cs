using Microsoft.EntityFrameworkCore;
namespace WebExtractor;


public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options)
      : base(options)
  {
  }

  // public DbSet<TodoItem> TodoItems { get; set; } = null!;
}
