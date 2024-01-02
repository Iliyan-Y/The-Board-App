using AutoMapper;
using WebExtractor.AI.Actions;
using WebExtractor.AI.Models;

namespace WebExtractor.AI;

internal sealed class CreateMapping : Profile
{
  public CreateMapping()
  {
    CreateMap<SaveQuestionCommand, Question>()
    .ForMember(x => x.Query, o => o.MapFrom(src => src.Question));
    CreateMap<Question, QuestionModel>()
    .ForMember(x => x.Question, o => o.MapFrom(src => src.Query));
  }

}