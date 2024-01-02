using WebExtractor.AI.Models;
namespace WebExtractor.AI.Actions;

public sealed record SaveQuestionCommand(string Question, string Answer, Guid TaskId);

public enum SaveQuestionResultStatus
{
  Saved = 1,
  Failed
}

public sealed record SaveQuestionResult(SaveQuestionResultStatus Status, QuestionModel? Model = null);