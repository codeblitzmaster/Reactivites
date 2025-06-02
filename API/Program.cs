using Application.Activities.Queries;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
});

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<Application.Core.MappingProfiles>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/openapi/v1.json", "v1");
        c.RoutePrefix = string.Empty; // et Swagger UI at the app's root if not remove this to load the swagger in https://localhost:<port>/swagger
    });
    app.MapScalarApiReference(); //https://localhost:<port>/scalar/v1
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(x =>
{
    x.AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader()
     .WithOrigins("http://localhost:3000", "https://localhost:3000");
});
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var dbContext = services.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();
    // Uncomment the line below to seed data
    await DbInitializer.SeedData(dbContext);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration or seeding the database.");
}


app.Run();
