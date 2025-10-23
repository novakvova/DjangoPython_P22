namespace WebAPIDB.Models.Topics;

public class TopicItemModel
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string UrlSlug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Priority { get; set; }
    public long? ParentId { get; set; }

    public List<TopicItemModel>? Children { get; set; }
}
