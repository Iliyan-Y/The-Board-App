using AutoMapper;

namespace WebExtractor.Api.WebScrapper;
internal sealed class Mapping : Profile
{
  public Mapping()
  {
    CreateMap<SavePageRequestModel, SavePageCommand>();
    CreateMap<GetSavedPageRequestModel, GetSavedPageCommand>();
  }
}