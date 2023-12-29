
namespace WebExtractor.AI.Actions;
public sealed record AskQuestionCommand(Guid TaskId, string Title, string Question);

public sealed record AskQuestionResult(AskQuestionResultStatus Status, string? Answer);

public enum AskQuestionResultStatus
{
  Success,
  Failed
}


