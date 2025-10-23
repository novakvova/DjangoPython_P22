
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIDB.Data;

namespace WebAPIDB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TopicsController(AppDbContext appDbContext,
    IMapper mapper) : ControllerBase
{
    [HttpGet("all")]
    public async Task<IActionResult> GetAllTopicsAsync()
    {
        var model = await appDbContext.Topics
            .Where(t => t.ParentId == null)
            .OrderBy(t => t.Priority)
            .ProjectTo<Models.Topics.TopicItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        return Ok(model);
    }

}
