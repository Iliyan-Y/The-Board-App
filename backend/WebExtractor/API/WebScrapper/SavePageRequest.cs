public class SavePageRequestModel
{
  public required Guid TaskId { get; set; }
  public required string TaskName { get; set; }

  public required string Url { get; set; }
}