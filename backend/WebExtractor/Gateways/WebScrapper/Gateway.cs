namespace WebExtractor.WebScrapper;

public interface WebScrapperGateway
{
  Task<Boolean> GetPages(string url);
}
