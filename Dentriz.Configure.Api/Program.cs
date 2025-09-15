using Dentriz.Configure.Api.Services;
using Dentriz.Configure.Api.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Cosmos DB Configuration Service
builder.Services.AddSingleton<ICosmosDbConfigurationService, CosmosDbConfigurationService>();

// Add Repositories
builder.Services.AddScoped<IHeaderRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<HeaderRepository>>();
    return new HeaderRepository(configService.GetHeaderContainer(), logger);
});

builder.Services.AddScoped<IGalleryContentRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<GalleryContentRepository>>();
    return new GalleryContentRepository(configService.GetGalleryContentContainer(), logger);
});

builder.Services.AddScoped<IGalleryHeroRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<GalleryHeroRepository>>();
    return new GalleryHeroRepository(configService.GetGalleryHeroContainer(), logger);
});

builder.Services.AddScoped<IGalleryStatsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<GalleryStatsRepository>>();
    return new GalleryStatsRepository(configService.GetGalleryStatsContainer(), logger);
});

// Add Services
builder.Services.AddScoped<IHeaderService, HeaderService>();
builder.Services.AddScoped<IGalleryContentService, GalleryContentService>();
builder.Services.AddScoped<IGalleryHeroService, GalleryHeroService>();
builder.Services.AddScoped<IGalleryStatsService, GalleryStatsService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
