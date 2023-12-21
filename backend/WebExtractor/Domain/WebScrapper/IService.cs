namespace WebExtractor.WebScrapper;

public interface IWebScrapperService
{
  Task<SaveResult> SavePage(SavePageCommand command);
}