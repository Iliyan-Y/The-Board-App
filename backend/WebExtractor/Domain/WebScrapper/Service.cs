
using AutoMapper;

namespace WebExtractor.WebScrapper;

internal sealed class WebScrapperService : IWebScrapperService
{
  private readonly IMapper _mapper;
  private readonly WebScrapperGateway _gateway;

  public WebScrapperService(IMapper mapper, WebScrapperGateway gateway)
  {
    _mapper = mapper;
    _gateway = gateway;
  }

  public GetSavedResult GetSavedPage(GetSavedPageCommand command)
  {
    var result = _gateway.GetSavedPage(_mapper.Map<DataModel>(command));
    if (result != null) return new GetSavedResult(GetSavedPageResultStatus.Found, result);
    return new GetSavedResult(GetSavedPageResultStatus.NotFound);
  }

  public async Task<SaveResult> SavePage(SavePageCommand command)
  {
    var res = await _gateway.SavePage(_mapper.Map<DataModel>(command));
    if (res) return new SaveResult(SavePageResultStatus.Saved, res);
    return new SaveResult(SavePageResultStatus.FailedToCreate, res);
  }
}