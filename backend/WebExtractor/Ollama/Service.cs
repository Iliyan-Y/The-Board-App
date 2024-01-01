

using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using WebExtractor.AI;


namespace WebExtractor.Ollama;

internal sealed class OpenAiService(HttpClient httpClient, string aiModel) : AIGateway
{
  private readonly HttpClient _httpClient = httpClient;
  private readonly string _aiModel = aiModel;

  async public Task<string?> AskQuestion(string question)
  {

    var requestContent = new MessageRequest
    {
      Model = _aiModel,
      Prompt = question
    };
    var requestJson = JsonSerializer.Serialize(requestContent);
    var request = new StringContent(requestJson, Encoding.UTF8, "application/json");

    var response = await _httpClient.PostAsync("", request);
    response.EnsureSuccessStatusCode();
    var responseBody = await response.Content.ReadAsStringAsync();

    var responseData = JsonSerializer.Deserialize<AiResponse>(responseBody);

    if (responseData != null && !string.IsNullOrEmpty(responseData.Response)) { return responseData.Response; }


    return null;

  }
}




public class MessageRequest
{
  public string? Model { get; set; }
  public string? Prompt { get; set; }

  public bool Stream { get; set; } = false;

}

public class AiResponse
{
  [JsonPropertyName("model")]
  public string Model { get; set; }

  [JsonPropertyName("created_at")]
  public DateTime CreatedAt { get; set; }

  [JsonPropertyName("response")]
  public string Response { get; set; }

  [JsonPropertyName("done")]
  public bool Done { get; set; }
}