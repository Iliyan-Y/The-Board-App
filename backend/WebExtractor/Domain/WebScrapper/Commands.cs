public sealed record SavePageCommand(string TaskName, Guid TaskId, string Url);

public sealed record SaveResult(SavePageResultStatus Status,
  bool? Result = null);

public enum SavePageResultStatus
{
  Saved = 1,
  FailedToCreate
}