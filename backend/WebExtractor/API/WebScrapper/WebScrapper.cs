using Microsoft.AspNetCore.Mvc;
using WebExtractor.WebScrapper;


namespace WebExtractor.Api.WebScrapper;

[Route("[controller]")]
[ApiController]
public class WebScrapperController : ControllerBase
{
    private readonly IWebScrapperService service;

    public WebScrapperController(IWebScrapperService service)
    {
        this.service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var res = await service.GetPage("https://www.google.com");
        return Ok(res);
    }


    [HttpPost]
    public ContentResult Test()
    {
        var html = System.IO.File.ReadAllText("../Downloads/output.html");
        return new ContentResult
        {
            ContentType = "text/html",
            Content = html
        };
    }
}


