using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebExtractor;

[Table("task")]
public class Task
{
  [Key]
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Required]
  [Column("name")]
  public string? Name { get; set; }

  [Column("description")]
  public string? Description { get; set; }

  [Column("url")]
  public string? Url { get; set; }

  [ForeignKey("column")]
  [Column("columnId")]
  public Guid ColumnId { get; set; }
  public virtual BoardColumn? Column { get; set; }

  [Column("created_at")]
  public DateTime CreatedAt { get; set; }

  [Column("updated_at")]
  public DateTime UpdatedAt { get; set; }
  public virtual ICollection<Question>? Questions { get; set; }
}