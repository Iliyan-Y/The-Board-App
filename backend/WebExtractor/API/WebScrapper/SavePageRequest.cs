public class SavePageRequestModel
{
  public required Guid TaskId { get; set; }
  public required Guid BoardId { get; set; }

  public required string Url { get; set; }
}