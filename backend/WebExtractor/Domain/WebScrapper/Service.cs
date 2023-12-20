
namespace WebExtractor.WebScrapper;

internal sealed class WebScrapperService : IWebScrapperService
{
  private readonly WebScrapperGateway _gateway;

  public WebScrapperService(WebScrapperGateway gateway)
  {
    _gateway = gateway;
  }

  public async Task<Boolean> GetPage(string url)
  {
    var res = await _gateway.GetPages(url);
    return res;
  }
}