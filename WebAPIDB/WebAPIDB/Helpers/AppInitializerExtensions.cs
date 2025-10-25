using FFMpegCore;
using FFMpegCore.Extensions.Downloader;
using FFMpegCore.Extensions.Downloader.Enums;
using Microsoft.Extensions.FileProviders;

namespace WebAPIDB.Helpers;

public static class AppInitializerExtensions
{
    public static async Task<WebApplication> InitializeAppAsync(this WebApplication app)
    {
        var config = app.Configuration;

        var imagesDir = config["ImagesDir"];
        var videosDir = config["VideoDir"];

        var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), imagesDir!);
        var videosPath = Path.Combine(Directory.GetCurrentDirectory(), videosDir!);

        Directory.CreateDirectory(imagesPath);
        Directory.CreateDirectory(videosPath);

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(imagesPath),
            RequestPath = $"/{imagesDir}"
        });

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(videosPath),
            RequestPath = $"/{videosDir}"
        });

        var ffmpegDir = Path.Combine(Directory.GetCurrentDirectory(), ".ffmpeg");
        Directory.CreateDirectory(ffmpegDir);

        var tempDir = Path.Combine(Directory.GetCurrentDirectory(), "temp");
        Directory.CreateDirectory(tempDir);

        var ffOptions = new FFOptions
        {
            BinaryFolder = ffmpegDir,
            TemporaryFilesFolder = tempDir
        };

        var ffmpegExe = Path.Combine(ffmpegDir, "ffmpeg.exe");
        var ffprobeExe = Path.Combine(ffmpegDir, "ffprobe.exe");

        if (!File.Exists(ffmpegExe) || !File.Exists(ffprobeExe))
        {
            await FFMpegDownloader.DownloadBinaries(
                FFMpegVersions.LatestAvailable,
                options: ffOptions
            );
        }

        GlobalFFOptions.Configure(opt =>
        {
            opt.BinaryFolder = ffmpegDir;
            opt.TemporaryFilesFolder = tempDir;
        });

        return app;
    }
}
