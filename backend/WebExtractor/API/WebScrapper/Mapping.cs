using AutoMapper;

internal sealed class Mapping : Profile
{
  public Mapping()
  {
    CreateMap<SavePageRequestModel, SavePageCommand>();
  }
}