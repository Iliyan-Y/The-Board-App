using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebExtractor.AI;
using WebExtractor.AI.Actions;

namespace WebExtractor.Api.AI;

[Route("[controller]")]
[ApiController]
public class AiController : ControllerBase
{

  private readonly IAIService _service;
  private readonly IMapper _mapper;

  public AiController(IAIService service, IMapper mapper)
  {
    _service = service;
    _mapper = mapper;
  }


  public async Task<IActionResult> AskQuestion(AskQuestionRequest request)
  {
    var result = await _service.AskQuestion(_mapper.Map<AskQuestionCommand>(request));
    return result.Status switch
    {
      AskQuestionResultStatus.Success => Ok(result.Answer),
      AskQuestionResultStatus.Failed => Conflict(),
      _ => Problem("An unexpected issue occurred while AI request")
    };
  }


}