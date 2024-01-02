using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebExtractor;
[Table("question")]
public class Question
{
  [Key]
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Required]
  [Column("query")]
  public required string Query { get; set; }

  [Required]
  [Column("answer")]
  public required string Answer { get; set; }

  [ForeignKey("task")]
  [Column("taskId")]
  public Guid TaskId { get; set; }
  public virtual Task? Task { get; set; }
}