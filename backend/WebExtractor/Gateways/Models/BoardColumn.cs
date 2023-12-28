using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebExtractor;

public class BoardColumn
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Required]
  public string? Name { get; set; }

  [ForeignKey("Board")]
  public Guid BoardId { get; set; }
  public virtual Board? Board { get; set; }

  public virtual ICollection<Task>? Tasks { get; set; }
}