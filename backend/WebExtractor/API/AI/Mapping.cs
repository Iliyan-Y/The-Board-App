using AutoMapper;
using WebExtractor.AI.Actions;

namespace WebExtractor.Api.AI;
internal sealed class Mapping : Profile
{
  public Mapping()
  {
    CreateMap<AskQuestionRequest, AskQuestionCommand>();
  }

}