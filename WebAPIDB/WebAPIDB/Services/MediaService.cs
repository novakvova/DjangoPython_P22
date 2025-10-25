using FFMpegCore;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;
using WebAPIDB.Interfaces;

namespace WebAPIDB.Services;

public class MediaService(IConfiguration configuration) : IMediaService
{
    public async Task DeleteImageAsync(string name)
    {
        var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>();
        var dir = Path.Combine(Directory.GetCurrentDirectory(), configuration["ImagesDir"]!);

        Task[] tasks = sizes!
            .AsParallel()
            .Select(size =>
            {
                return Task.Run(() =>
                {
                    //var path = Path.Combine(dir, $"{size}_{name}");
                    var path = Path.Combine(dir, $"{name}");
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                    }
                });
            })
            .ToArray();

        await Task.WhenAll(tasks);
    }

    public async Task<string> SaveImageFromUrlAsync(string imageUrl)
    {
        using var httpClient = new HttpClient();
        var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
        return await SaveImageAsync(imageBytes);
    }


    public async Task<string> SaveImageAsync(IFormFile file)
    {
        using MemoryStream ms = new();
        await file.CopyToAsync(ms);
        var bytes = ms.ToArray();

        var imageName = await SaveImageAsync(bytes);
        return imageName;
    }

    private async Task<string> SaveImageAsync(byte[] bytes)
    {
        string imageName = $"{Path.GetRandomFileName()}.webp";
        var sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>();

        Task[] tasks = sizes
            .AsParallel()
            .Select(s => SaveImageAsync(bytes, imageName, s))
            .ToArray();

        await Task.WhenAll(tasks);

        return imageName;
    }

    public async Task<string> SaveImageFromBase64Async(string input)
    {
        var base64Data = input.Contains(",")
           ? input.Substring(input.IndexOf(",") + 1)
           : input;

        byte[] imageBytes = Convert.FromBase64String(base64Data);

        return await SaveImageAsync(imageBytes);
    }

    public async Task<string> SaveVideoAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("Файл не знайдено або порожній");

        //Дозволені формати
        var allowedExtensions = new[] { ".mp4", ".webm", ".mov" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(extension))
            throw new InvalidOperationException("Непідтримуваний формат відео");

        //Обмеження розміру (наприклад, до 50 МБ)
        if (file.Length > 50 * 1024 * 1024)
            throw new InvalidOperationException("Відео завелике");

        //Тимчасово зберігаємо файл для перевірки
        var tempPath = Path.GetTempFileName();
        using (var stream = new FileStream(tempPath, FileMode.Create))
            await file.CopyToAsync(stream);

        //Перевіряємо тривалість (до 2 хв)
        var info = await FFProbe.AnalyseAsync(tempPath);
        if (info.Duration.TotalMinutes > 2)
        {
            File.Delete(tempPath);
            throw new InvalidOperationException("Відео перевищує 2 хвилини");
        }

        //Генеруємо нове ім’я
        var videoName = $"{Guid.NewGuid()}{extension}";
        var saveDir = Path.Combine(Directory.GetCurrentDirectory(), configuration["VideoDir"]!);
        Directory.CreateDirectory(saveDir);

        var finalPath = Path.Combine(saveDir, videoName);
        File.Move(tempPath, finalPath);

        return videoName;
    }

    private async Task SaveImageAsync(byte[] bytes, string name, int size)
    {
        //var path = Path.Combine(Directory.GetCurrentDirectory(), configuration["ImagesDir"]!, $"{size}_{name}");
        var path = Path.Combine(Directory.GetCurrentDirectory(), configuration["ImagesDir"]!, $"{name}");
        using var image = Image.Load(bytes);
        image.Mutate(imgConext =>
        {
            imgConext.Resize(new ResizeOptions
            {
                Size = new Size(size, size),
                Mode = ResizeMode.Max
            });
        });
        await image.SaveAsync(path, new WebpEncoder());
    }
}
