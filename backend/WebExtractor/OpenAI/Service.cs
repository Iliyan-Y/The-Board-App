using WebExtractor.AI;

namespace WebExtractor.OpenAI;

internal sealed class OpenAiService(HttpClient httpClient) : AIGateway
{
  private readonly HttpClient _httpClient = httpClient;

  async public Task<string> AskQuestion(string question)
  {
    var response = await _httpClient.GetAsync($"/ask?question={question}");
    response.EnsureSuccessStatusCode();

    throw new NotImplementedException();
  }
}