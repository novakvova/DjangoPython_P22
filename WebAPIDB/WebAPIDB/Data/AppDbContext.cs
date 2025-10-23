using Microsoft.EntityFrameworkCore;
using WebAPIDB.Data.Entities;

namespace WebAPIDB.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {   
    }
    public DbSet<TopicEntity> Topics { get; set; }
}
