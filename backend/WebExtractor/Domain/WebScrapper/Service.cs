
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



  public async Task<SaveResult> SavePage(SavePageCommand command)
  {
    var res = await _gateway.SavePage(_mapper.Map<DataModel>(command));
    if (res) return new SaveResult(SavePageResultStatus.Saved, res);
    return new SaveResult(SavePageResultStatus.FailedToCreate, res);
  }
}