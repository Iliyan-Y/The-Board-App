namespace WebExtractor.WebScrapper;

public interface IWebScrapperService
{
  Task<Boolean> GetPage(string url);
}