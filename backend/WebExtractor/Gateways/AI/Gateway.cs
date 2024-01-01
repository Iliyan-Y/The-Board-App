namespace WebExtractor.AI;

public interface AIGateway
{
  Task<string?> AskQuestion(string question);
}