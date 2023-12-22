namespace WebExtractor.WebScrapper;

public interface WebScrapperGateway
{
  Task<bool> SavePage(DataModel model);
}
