namespace WebAPIDB.Interfaces;

public interface IMediaService
{
    Task<string> SaveImageAsync(IFormFile file);
    Task<string> SaveVideoAsync(IFormFile file);
    Task<string> SaveImageFromUrlAsync(string imageUrl);
    Task<string> SaveImageFromBase64Async(string input);
    Task DeleteImageAsync(string name);
}
