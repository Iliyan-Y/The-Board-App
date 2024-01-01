using WebExtractor.AI.Actions;

namespace WebExtractor.AI;

internal sealed class AIService(AIGateway gateway) : IAIService
{
  private readonly AIGateway _aiGateway = gateway;

  public async Task<AskQuestionResult> AskQuestion(AskQuestionCommand command)
  {
    var answer = await _aiGateway.AskQuestion(command.Question);

    if (answer != null) return new AskQuestionResult(AskQuestionResultStatus.Success, answer);

    return new AskQuestionResult(AskQuestionResultStatus.Failed, null);
  }
}