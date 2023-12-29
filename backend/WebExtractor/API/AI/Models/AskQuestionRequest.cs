namespace WebExtractor.Api.AI;
public record AskQuestionRequest(
  Guid TaskId,
  string Title,
  string Question
);