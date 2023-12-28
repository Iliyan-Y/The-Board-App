using PuppeteerSharp;

namespace WebExtractor.WebScrapper;

internal sealed class WebScrapper : WebScrapperGateway
{
  // TODO: move to config
  private readonly string _downloadsRoot = "../Downloads";

  public string? GetSavedPage(DataModel model)
  {
    var path = $"{_downloadsRoot}/{model.BoardId}/{model.TaskId}.html";

    var ifExists = File.Exists(path);
    if (ifExists)
    {
      return File.ReadAllText(path);
    }
    return null;
  }

  public async Task<bool> SavePage(DataModel model)
  {

    var downloadsPath = $"{_downloadsRoot}/{model.BoardId}/";
    DirectoryCheck(downloadsPath);

    await new BrowserFetcher().DownloadAsync();
    using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
    var page = await browser.NewPageAsync();
    await page.GoToAsync(model.Url);
    await page.WaitForTimeoutAsync(1000);
    var bodyHtml = await page.EvaluateExpressionAsync<string>("document.body.innerHTML");
    var htmlContent = await page.GetContentAsync();
    File.WriteAllText(downloadsPath + model.TaskId + ".html", bodyHtml);

    return true;
  }

  private void DirectoryCheck(string path)
  {
    var ifExists = Directory.Exists(path);
    if (!ifExists)
    {
      Directory.CreateDirectory(path);
    }
  }

}