

using System.Text;
using System.Text.Json;
using WebExtractor.AI;


namespace WebExtractor.OpenAI;

internal sealed class OpenAiService(HttpClient httpClient, string aiModel) : AIGateway
{
  private readonly HttpClient _httpClient = httpClient;
  private readonly string _aiModel = aiModel;

  async public Task<string> AskQuestion(string question)
  {

    var requestContent = new ChatRequest
    {
      Model = "gpt-3.5-turbo",
      Messages = new List<Message>
            {
                new Message { Role = "system", Content = "You are a helpful assistant." },
                new Message { Role = "user", Content = "Who won the world series in 2020?" }
            }
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


public class Message
{
  public string Role { get; set; }
  public string Content { get; set; }
}

public class ChatRequest
{
  public string Model { get; set; }
  public List<Message> Messages { get; set; }
}