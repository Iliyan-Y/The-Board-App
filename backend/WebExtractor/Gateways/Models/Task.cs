using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebExtractor;

public class Task
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Required]
  public string? Name { get; set; }

  public string? Description { get; set; }

  public string? Url { get; set; }

  [ForeignKey("Column")]
  public Guid ColumnId { get; set; }
  public virtual BoardColumn? Column { get; set; }

  public DateTime CreatedAt { get; set; }

  public DateTime UpdatedAt { get; set; }
  public virtual ICollection<Question>? Questions { get; set; }
}