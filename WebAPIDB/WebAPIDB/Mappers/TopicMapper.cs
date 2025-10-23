using AutoMapper;
using WebAPIDB.Data.Entities;
using WebAPIDB.Models.Topics;

namespace WebAPIDB.Mappers;

public class TopicMapper : Profile
{
    public TopicMapper()
    {
        CreateMap<TopicEntity, TopicItemModel>();
    }
}
