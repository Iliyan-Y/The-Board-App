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
        var result = await _service.SavePage(_mapper.Map<SavePageCommand>(requestModel));

        return result.Status switch
        {
            SavePageResultStatus.Saved => Created("", result.Result),
            SavePageResultStatus.FailedToCreate => Conflict(),
            _ => Problem("An unexpected issue occurred while Creating the Investor")
        };
    }


    [HttpGet("{taskId}")]
    public IActionResult Get(Guid taskId, [FromQuery] Guid boardId)
    {
        var requestModel = new GetSavedPageRequestModel(taskId, boardId);
        var result = _service.GetSavedPage(_mapper.Map<GetSavedPageCommand>(requestModel));
        return result.Status switch
        {
            GetSavedPageResultStatus.Found => Ok(result.Page),
            GetSavedPageResultStatus.NotFound => NotFound(),
            _ => Problem("An unexpected issue occurred while Creating the Investor")
        };
    }
}


