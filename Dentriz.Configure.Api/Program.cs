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
    return new HeaderRepository(configService.GetHeaderContainer(), logger, configService);
});

builder.Services.AddScoped<IGalleryContentRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<GalleryContentRepository>>();
    return new GalleryContentRepository(configService.GetGalleryContentContainer(), logger, configService);
});

builder.Services.AddScoped<IGalleryHeroRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<GalleryHeroRepository>>();
    return new GalleryHeroRepository(configService.GetGalleryHeroContainer(), logger, configService);
});

builder.Services.AddScoped<IGalleryStatsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<GalleryStatsRepository>>();
    return new GalleryStatsRepository(configService.GetGalleryStatsContainer(), logger, configService);
});

// Add About Repositories
builder.Services.AddScoped<IAboutDoctorsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<AboutDoctorsRepository>>();
    return new AboutDoctorsRepository(configService.GetAboutDoctorsContainer(), logger, configService);
});

builder.Services.AddScoped<IAboutValuesRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<AboutValuesRepository>>();
    return new AboutValuesRepository(configService.GetAboutValuesContainer(), logger, configService);
});

builder.Services.AddScoped<IAboutTestimonialsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<AboutTestimonialsRepository>>();
    return new AboutTestimonialsRepository(configService.GetAboutTestimonialsContainer(), logger, configService);
});

builder.Services.AddScoped<IAboutTechnologyRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<AboutTechnologyRepository>>();
    return new AboutTechnologyRepository(configService.GetAboutTechnologyContainer(), logger, configService);
});

// Add Contact Repositories
builder.Services.AddScoped<IContactFaqRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactFaqRepository>>();
    return new ContactFaqRepository(configService.GetContactFaqContainer(), logger, configService);
});

builder.Services.AddScoped<IContactHeroRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactHeroRepository>>();
    return new ContactHeroRepository(configService.GetContactHeroContainer(), logger, configService);
});

builder.Services.AddScoped<IContactInfoRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactInfoRepository>>();
    return new ContactInfoRepository(configService.GetContactInfoContainer(), logger, configService);
});

builder.Services.AddScoped<IContactLocationRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactLocationRepository>>();
    return new ContactLocationRepository(configService.GetContactLocationContainer(), logger, configService);
});

builder.Services.AddScoped<IContactOfficeHoursRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactOfficeHoursRepository>>();
    return new ContactOfficeHoursRepository(configService.GetContactOfficeHoursContainer(), logger, configService);
});

builder.Services.AddScoped<IContactPaymentsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ContactPaymentsRepository>>();
    return new ContactPaymentsRepository(configService.GetContactPaymentsContainer(), logger, configService);
});

// Add Services Repositories
builder.Services.AddScoped<IServicesHeroRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ServicesHeroRepository>>();
    return new ServicesHeroRepository(configService.GetServicesHeroContainer(), logger, configService);
});

builder.Services.AddScoped<IServicesTechnologySectionRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ServicesTechnologySectionRepository>>();
    return new ServicesTechnologySectionRepository(configService.GetServicesTechnologySectionContainer(), logger, configService);
});

builder.Services.AddScoped<IServicesRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<ServicesRepository>>();
    return new ServicesRepository(configService.GetServicesContainer(), logger, configService);
});

// Add Home Repositories
builder.Services.AddScoped<IHomeFounderRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<HomeFounderRepository>>();
    return new HomeFounderRepository(configService.GetHomeFounderContainer(), logger, configService);
});

builder.Services.AddScoped<IHomeNewPatientRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<HomeNewPatientRepository>>();
    return new HomeNewPatientRepository(configService.GetHomeNewPatientContainer(), logger, configService);
});

builder.Services.AddScoped<IHomeReasonsRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<HomeReasonsRepository>>();
    return new HomeReasonsRepository(configService.GetHomeReasonsContainer(), logger, configService);
});

builder.Services.AddScoped<IHomeServicesRepository>(provider =>
{
    var configService = provider.GetRequiredService<ICosmosDbConfigurationService>();
    var logger = provider.GetRequiredService<ILogger<HomeServicesRepository>>();
    return new HomeServicesRepository(configService.GetHomeServicesContainer(), logger, configService);
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
builder.Services.AddScoped<IServicesService, ServicesService>();

// Add Home Services
builder.Services.AddScoped<IHomeFounderService, HomeFounderService>();
builder.Services.AddScoped<IHomeNewPatientService, HomeNewPatientService>();
builder.Services.AddScoped<IHomeReasonsService, HomeReasonsService>();
builder.Services.AddScoped<IHomeServicesService, HomeServicesService>();

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
