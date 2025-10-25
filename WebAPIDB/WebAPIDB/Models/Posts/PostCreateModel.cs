using Microsoft.AspNetCore.Mvc;

namespace WebAPIDB.Models.Posts;

public class PostCreateModel
{
    [FromForm(Name = "title")]
    public string Title { get; set; } = string.Empty;

    [FromForm(Name = "body")]
    public string Body { get; set; } = string.Empty;

    [FromForm(Name = "image")]
    public IFormFile? Image { get; set; }

    [FromForm(Name = "video")]
    public IFormFile? Video { get; set; }

    [FromForm(Name = "video_url")]
    public string? VideoUrl { get; set; }

    [FromForm(Name = "topic_id")]
    public long TopicId { get; set; }

    [FromForm(Name = "user_id")]
    public long UserId { get; set; }
}
