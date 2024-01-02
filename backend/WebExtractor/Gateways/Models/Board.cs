using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebExtractor;
[Table("board")]
public class Board
{
  [Key]
  [Column("id")]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public Guid Id { get; set; }

  [Required]
  [Column("name")]
  public string? Name { get; set; }

  public virtual ICollection<BoardColumn>? Columns { get; set; }
}