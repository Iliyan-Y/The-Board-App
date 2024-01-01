using Microsoft.EntityFrameworkCore;
using WebExtractor;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddDomain();
builder.Services.AddWebScrapper();
// TODO: throw error if DefaultConnection
builder.Services.AddDatabase(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("WebExtractor.Api")));
// TODO: throw error if no key
builder.Services.AddAi(builder.Configuration.GetSection("AiConfig").Get<AiConfig>());

builder.Services.AddAutoMapper(typeof(Program).Assembly, typeof(Domain).Assembly);


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
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
app.MapControllers();
app.UseCors();

app.Run();


