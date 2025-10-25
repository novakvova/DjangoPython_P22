namespace WebAPIDB.Models.Posts;

public class PostItemModel
{
    public long Id { get; set; }
    public string Title { get; set; } = null!;
    public string Body { get; set; } = null!;
    public string? Image { get; set; }
    public string? Video { get; set; }
    public string? VideoUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public long TopicId { get; set; }
    public string? TopicName { get; set; }
}
