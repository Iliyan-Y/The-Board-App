using WebExtractor.AI;

namespace WebExtractor.AI;
internal sealed class Repository(DataContext context) : DataGateway
{

  private readonly DataContext _context = context;

  public async Task<Question> Save(Question data)
  {
    var result = await _context.Questions.AddAsync(data).ConfigureAwait(false);
    await _context.SaveChangesAsync();
    return result.Entity;
  }
}