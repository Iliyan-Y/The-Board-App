namespace WebExtractor.WebScrapper;

public interface WebScrapperGateway
{
  Task<Boolean> SavePage(DataModel model);
}
