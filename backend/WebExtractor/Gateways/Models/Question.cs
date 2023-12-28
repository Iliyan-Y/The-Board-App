using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebExtractor;
public class Question
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Required]
  public required string Query { get; set; }

  [Required]
  public required string Answer { get; set; }

  [ForeignKey("Task")]
  public Guid TaskId { get; set; }
  public virtual Task? Task { get; set; }
}