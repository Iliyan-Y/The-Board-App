

using System.Text;
using System.Text.Json;
using WebExtractor.AI;


namespace WebExtractor.Ollama;

internal sealed class OpenAiService(HttpClient httpClient, string aiModel) : AIGateway
{
  private readonly HttpClient _httpClient = httpClient;
  private readonly string _aiModel = aiModel;

  async public Task<string> AskQuestion(string question)
  {

    var requestContent = new MessageRequest
    {
      Model = _aiModel,
      Prompt = "Who are you ?"
    };
    var requestJson = JsonSerializer.Serialize(requestContent);
    var request = new StringContent(requestJson, Encoding.UTF8, "application/json");

    var response = await _httpClient.PostAsync("", request);
    response.EnsureSuccessStatusCode();

    var responseBody = await response.Content.ReadAsStringAsync();

    Console.WriteLine(responseBody);

    throw new NotImplementedException();
  }
}




public class MessageRequest
{
  public string Model { get; set; }
  public string Prompt { get; set; }

  public bool Stream { get; set; } = false;

}