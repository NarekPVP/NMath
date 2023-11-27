using HistoryService.Models;
using MongoDB.Driver;
using MongoDB.Entities;

namespace HistoryService.Persistence;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        await DB.InitAsync("EquationsHistory", MongoClientSettings
            .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

        await DB.Index<EquationItem>()
            .Key(x => x.Equation, KeyType.Text)
            .Key(x => x.Result, KeyType.Text)
            .CreateAsync();
    }
}