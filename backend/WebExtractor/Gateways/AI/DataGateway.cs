
namespace WebExtractor.AI;
public interface DataGateway
{
  Task<Question> Save(Question data);
}