using System.Text.Json;

namespace WebAPIDB.Helpers;

public class SnakeCaseNamingPolicy : JsonNamingPolicy
{
    public override string ConvertName(string name)
    {
        // "UrlSlug" => "url_slug"
        return string.Concat(
            name.Select((c, i) =>
                i > 0 && char.IsUpper(c) ? "_" + char.ToLower(c) : char.ToLower(c).ToString()
            )
        );
    }
}
