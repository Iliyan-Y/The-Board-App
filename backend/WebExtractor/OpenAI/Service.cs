using WebExtractor.AI;

namespace WebExtractor.OpenAI;

internal sealed class OpenAiService(string key) : AIGateway
{
  private readonly string _key = key;

  public Task<string> AskQuestion(string question)
  {
    throw new NotImplementedException();
  }
}