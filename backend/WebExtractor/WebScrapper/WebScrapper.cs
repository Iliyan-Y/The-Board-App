using PuppeteerSharp;

namespace WebExtractor.WebScrapper;

internal sealed class WebScrapper : WebScrapperGateway
{
  public async Task<bool> SavePage(DataModel model)
  {
    // TODO: move to config
    var downloadsPath = $"../Downloads/{model.BoardId}/";
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