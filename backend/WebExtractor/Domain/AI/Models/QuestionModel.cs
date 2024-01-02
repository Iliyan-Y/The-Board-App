namespace WebExtractor.AI.Models;

public class QuestionModel
{
  public Guid Id { get; set; }

  public required string Question { get; set; }

  public required string Answer { get; set; }

  public Guid TaskId { get; set; }
}