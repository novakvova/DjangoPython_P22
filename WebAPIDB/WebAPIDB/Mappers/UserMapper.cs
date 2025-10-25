using AutoMapper;
using WebAPIDB.Data.Entities.Identity;
using WebAPIDB.Models.Seeders;

namespace WebAPIDB.Mappers;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<SeederUserModel, UserEntity>()
            .ForMember(opt => opt.UserName, opt => opt.MapFrom(x => x.Email));
    }
}
