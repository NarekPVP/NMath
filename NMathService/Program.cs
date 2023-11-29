using NMathService.Services.Equation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(innerBuilder =>
    {
        innerBuilder.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


builder.Services
    .AddScoped<IEquationService, EquationService>();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
