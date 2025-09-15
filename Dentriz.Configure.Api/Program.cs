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

// Add About Repositories
builder.Services.AddScoped<IAboutDoctorsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<AboutDoctorsRepository>>();
    return new AboutDoctorsRepository(configService.GetAboutDoctorsContainer(), logger);
});

builder.Services.AddScoped<IAboutValuesRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<AboutValuesRepository>>();
    return new AboutValuesRepository(configService.GetAboutValuesContainer(), logger);
});

builder.Services.AddScoped<IAboutTestimonialsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<AboutTestimonialsRepository>>();
    return new AboutTestimonialsRepository(configService.GetAboutTestimonialsContainer(), logger);
});

builder.Services.AddScoped<IAboutTechnologyRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<AboutTechnologyRepository>>();
    return new AboutTechnologyRepository(configService.GetAboutTechnologyContainer(), logger);
});

// Add Contact Repositories
builder.Services.AddScoped<IContactFaqRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactFaqRepository>>();
    return new ContactFaqRepository(configService.GetContactFaqContainer(), logger);
});

builder.Services.AddScoped<IContactHeroRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactHeroRepository>>();
    return new ContactHeroRepository(configService.GetContactHeroContainer(), logger);
});

builder.Services.AddScoped<IContactInfoRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactInfoRepository>>();
    return new ContactInfoRepository(configService.GetContactInfoContainer(), logger);
});

builder.Services.AddScoped<IContactLocationRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactLocationRepository>>();
    return new ContactLocationRepository(configService.GetContactLocationContainer(), logger);
});

builder.Services.AddScoped<IContactOfficeHoursRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactOfficeHoursRepository>>();
    return new ContactOfficeHoursRepository(configService.GetContactOfficeHoursContainer(), logger);
});

builder.Services.AddScoped<IContactPaymentsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactPaymentsRepository>>();
    return new ContactPaymentsRepository(configService.GetContactPaymentsContainer(), logger);
});

// Add Services Repositories
builder.Services.AddScoped<IServicesHeroRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ServicesHeroRepository>>();
    return new ServicesHeroRepository(configService.GetServicesHeroContainer(), logger);
});

builder.Services.AddScoped<IServicesTechnologySectionRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ServicesTechnologySectionRepository>>();
    return new ServicesTechnologySectionRepository(configService.GetServicesTechnologySectionContainer(), logger);
});

// Add Services
builder.Services.AddScoped<IHeaderService, HeaderService>();
builder.Services.AddScoped<IGalleryContentService, GalleryContentService>();
builder.Services.AddScoped<IGalleryHeroService, GalleryHeroService>();
builder.Services.AddScoped<IGalleryStatsService, GalleryStatsService>();

// Add About Services
builder.Services.AddScoped<IAboutDoctorsService, AboutDoctorsService>();
builder.Services.AddScoped<IAboutValuesService, AboutValuesService>();
builder.Services.AddScoped<IAboutTestimonialsService, AboutTestimonialsService>();
builder.Services.AddScoped<IAboutTechnologyService, AboutTechnologyService>();

// Add Contact Services
builder.Services.AddScoped<IContactFaqService, ContactFaqService>();
builder.Services.AddScoped<IContactHeroService, ContactHeroService>();
builder.Services.AddScoped<IContactInfoService, ContactInfoService>();
builder.Services.AddScoped<IContactLocationService, ContactLocationService>();
builder.Services.AddScoped<IContactOfficeHoursService, ContactOfficeHoursService>();
builder.Services.AddScoped<IContactPaymentsService, ContactPaymentsService>();

// Add Services Services
builder.Services.AddScoped<IServicesHeroService, ServicesHeroService>();
builder.Services.AddScoped<IServicesTechnologySectionService, ServicesTechnologySectionService>();

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
