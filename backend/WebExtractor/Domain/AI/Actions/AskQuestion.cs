
namespace WebExtractor.AI.Actions;
public sealed record AskQuestionCommand(string Question);

public sealed record AskQuestionResult(AskQuestionResultStatus Status, string? Answer);

public enum AskQuestionResultStatus
{
  Success,
  Failed
}


