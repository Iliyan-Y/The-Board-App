using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebExtractor;

public class Board
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Required]
  public string? Name { get; set; }

  public virtual ICollection<BoardColumn>? Columns { get; set; }
}