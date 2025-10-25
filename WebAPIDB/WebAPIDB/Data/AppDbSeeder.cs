using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebAPIDB.Constants;
using WebAPIDB.Data.Entities;
using WebAPIDB.Data.Entities.Identity;
using WebAPIDB.Interfaces;
using WebAPIDB.Models.Seeders;

namespace WebAPIDB.Data;

public static class AppDbSeeder
{
    public static void Seed(this IApplicationBuilder applicationBuilder)
    {
        var scopeFactory = applicationBuilder.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
        using var scope = scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
        var mapper = scope.ServiceProvider.GetRequiredService<IMapper>();
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

        if (!context.Roles.Any())
        {
            foreach (var roleName in Roles.AllRoles)
            {
                var result = roleManager.CreateAsync(new(roleName)).Result;
                if (!result.Succeeded)
                {
                    Console.WriteLine("Error Create Role {0}", roleName);
                }
            }
        }


        if (!context.Users.Any())
        {
            var imageService = scope.ServiceProvider.GetRequiredService<IMediaService>();
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Users.json");
            if (File.Exists(jsonFile))
            {
                var jsonData = File.ReadAllText(jsonFile);
                try
                {
                    var users = JsonConvert.DeserializeObject<List<SeederUserModel>>(jsonData);
                    foreach (var user in users)
                    {
                        var entity = mapper.Map<UserEntity>(user);
                        entity.UserName = user.Email;
                        entity.Image = imageService.SaveImageFromUrlAsync(user.Image).Result;
                        var result = userManager.CreateAsync(entity, user.Password).Result;
                        if (!result.Succeeded)
                        {
                            Console.WriteLine("Error Create User {0}", user.Email);
                            continue;
                        }
                        foreach (var role in user.Roles)
                        {
                            if (roleManager.RoleExistsAsync(role).Result)
                            {
                                result = userManager.AddToRoleAsync(entity, role).Result;
                            }
                            else
                            {
                                Console.WriteLine("Not Found Role {0}", role);
                            }
                        }
                    }

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error Json Parse Data {0}", ex.Message);
                }
            }
            else
            {
                Console.WriteLine("Not Found File Users.json");
            }
        }

    }
}
