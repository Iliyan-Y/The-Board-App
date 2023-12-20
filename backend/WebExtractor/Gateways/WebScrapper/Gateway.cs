namespace WebExtractor.WebScrapper;

public interface WebScrapperGateway
{
  Task<Boolean> GetPage(string url);
}
