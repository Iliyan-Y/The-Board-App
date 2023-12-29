using WebExtractor.AI.Actions;

namespace WebExtractor.AI;

public interface IAIService
{
  Task<AskQuestionResult> AskQuestion(AskQuestionCommand command);
}