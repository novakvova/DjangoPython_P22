using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIDB.Data;
using WebAPIDB.Data.Entities;
using WebAPIDB.Interfaces;
using WebAPIDB.Models.Posts;

namespace WebAPIDB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PostsController(AppDbContext context, IMapper mapper, IMediaService mediaService) 
    : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetPostsAsync()
    {
        var posts = await context.Posts
            .ProjectTo<PostItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();
        return Ok(posts);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePostAsync([FromForm] PostCreateModel model)
    {
        try
        {
            var postEntity = mapper.Map<PostEntity>(model);
            if (model.Image != null)
            {
                postEntity.Image = await mediaService.SaveImageAsync(model.Image);
            }
            if (model.Video != null)
            {
                postEntity.Video = await mediaService.SaveVideoAsync(model.Video);
            }
            context.Posts.Add(postEntity);
            await context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }
}
