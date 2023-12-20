using PuppeteerSharp;

namespace WebExtractor.WebScrapper;

internal sealed class WebScrapper : WebScrapperGateway
{
  public async Task<bool> GetPage(string url)
  {
    var path = "../Downloads/";

    await new BrowserFetcher().DownloadAsync();
    using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
    var page = await browser.NewPageAsync();
    await page.GoToAsync(url);
    await page.WaitForTimeoutAsync(1000);
    var bodyHtml = await page.EvaluateExpressionAsync<string>("document.body.innerHTML");
    var htmlContent = await page.GetContentAsync();
    File.WriteAllText(path + "output.html", bodyHtml);

    return true;
  }
}