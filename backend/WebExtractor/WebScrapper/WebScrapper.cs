using PuppeteerSharp;

namespace WebExtractor.WebScrapper;

internal sealed class WebScrapper : WebScrapperGateway
{
  public async Task<bool> SavePage(DataModel model)
  {
    // TODO: move to config
    var downloadsPath = $"../Downloads/{model.TaskId}/";

    var ifExists = Directory.Exists(downloadsPath);
    if (!ifExists)
    {
      Directory.CreateDirectory(downloadsPath);
    }

    await new BrowserFetcher().DownloadAsync();
    using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
    var page = await browser.NewPageAsync();
    await page.GoToAsync(model.Url);
    await page.WaitForTimeoutAsync(1000);
    var bodyHtml = await page.EvaluateExpressionAsync<string>("document.body.innerHTML");
    var htmlContent = await page.GetContentAsync();
    File.WriteAllText(downloadsPath + model.TaskName + ".html", bodyHtml);

    return true;
  }


}