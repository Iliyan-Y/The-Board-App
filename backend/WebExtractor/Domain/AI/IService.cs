using WebExtractor.AI.Actions;
using WebExtractor.AI.Models;

namespace WebExtractor.AI;

public interface IAIService
{
  Task<AskQuestionResult> AskQuestion(AskQuestionCommand command);
  Task<SaveQuestionResult> SaveQuestion(SaveQuestionCommand command);
}