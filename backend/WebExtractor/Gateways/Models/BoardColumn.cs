using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebExtractor;

[Table("board_column")]
public class BoardColumn
{
  [Key]
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Required]
  [Column("name")]
  public string? Name { get; set; }

  [ForeignKey("board")]
  [Column("boardId")]
  public Guid BoardId { get; set; }
  public virtual Board? Board { get; set; }

  public virtual ICollection<Task>? Tasks { get; set; }
}