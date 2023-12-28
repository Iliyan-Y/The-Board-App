using Microsoft.EntityFrameworkCore;
namespace WebExtractor;


public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options)
      : base(options)
  {
  }

  public DbSet<Board> Boards { get; set; }
  public DbSet<BoardColumn> BoardColumns { get; set; }
  public DbSet<Task> Tasks { get; set; }
}
