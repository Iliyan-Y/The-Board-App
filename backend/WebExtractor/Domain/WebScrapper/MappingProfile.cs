using AutoMapper;

internal sealed class CreateMapping : Profile
{
  public CreateMapping()
  {
    CreateMap<SavePageCommand, DataModel>();
  }
}