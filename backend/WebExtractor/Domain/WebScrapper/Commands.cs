public sealed record SavePageCommand(Guid BoardId, Guid TaskId, string Url);

public sealed record SaveResult(SavePageResultStatus Status,
  bool? Result = null);

public enum SavePageResultStatus
{
  Saved = 1,
  FailedToCreate
}


public sealed record GetSavedPageCommand(Guid BoardId, Guid TaskId);

public sealed record GetSavedResult(GetSavedPageResultStatus Status,
  string? Page = null);

public enum GetSavedPageResultStatus
{
  Found = 1,
  NotFound
}