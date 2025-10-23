using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebAPIDB.Data.Entities;

namespace WebAPIDB.Data;

public static class AppDbSeeder
{
    public static void Seed(this IApplicationBuilder applicationBuilder)
    {
        var scopeFactory = applicationBuilder.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
        using var scope = scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        context.Database.Migrate();
        if (!context.Topics.Any())
        {
            try
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(),
                    "Helpers",
                    "JsonData",
                    "Topics.json");
                var jsonData = File.ReadAllText(filePath);

                var topics = JsonConvert.DeserializeObject<List<Models.Seeders.TopicSeeder>>(jsonData);

                int parentIndex = 1;
                foreach (var topic in topics!)
                {
                    var newTopic = new TopicEntity
                    {
                        Name = topic.Name,
                        Priority = parentIndex++,
                        Description = topic.Description,
                        UrlSlug = Helpers.SlugHelper.Slugify(topic.Name)
                    };
                    context.Topics.Add(newTopic);
                    context.SaveChanges();
                    int childIndex = 1;
                    foreach (var child in topic.Children!)
                    {
                        var newChildTopic = new TopicEntity
                        {
                            Name = child.Name,
                            Priority = childIndex++,
                            UrlSlug = Helpers.SlugHelper.Slugify(child.Name),
                            ParentId = newTopic.Id
                        };
                        context.Topics.Add(newChildTopic);
                    }
                    context.SaveChanges();

                }

                //Console.WriteLine("ReedData");


            }
            catch (Exception ex)
            {
                // Log the exception (you can use any logging framework you prefer)
                Console.WriteLine($"An error occurred while seeding the database: {ex.Message}");
            }

        }

    }
}
