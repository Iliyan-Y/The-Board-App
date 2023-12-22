using AutoMapper;

internal sealed class CreateMapping : Profile
{
  public CreateMapping()
  {
    CreateMap<SavePageCommand, DataModel>();
    CreateMap<GetSavedPageCommand, DataModel>().ForMember(x => x.Url, opt => opt.MapFrom(src => ""));
  }
}