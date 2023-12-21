using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebExtractor.WebScrapper;


namespace WebExtractor.Api.WebScrapper;

[Route("[controller]")]
[ApiController]
public class WebScrapperController : ControllerBase
{
    private readonly IWebScrapperService _service;
    private readonly IMapper _mapper;

    public WebScrapperController(IWebScrapperService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> SavePage(SavePageRequestModel requestModel)
    {
        var res = await _service.SavePage(_mapper.Map<SavePageCommand>(requestModel));
        return Ok(res);
    }


    [HttpGet]
    public ContentResult Get()
    {
        var html = System.IO.File.ReadAllText("../Downloads/output.html");
        return new ContentResult
        {
            ContentType = "text/html",
            Content = html
        };
    }
}


