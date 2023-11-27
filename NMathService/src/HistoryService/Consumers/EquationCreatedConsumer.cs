using Contracts;
using HistoryService.Models;
using MassTransit;
using MongoDB.Entities;

namespace HistoryService.Consumers;

public class EquationCreatedConsumer : IConsumer<EquationCreated>
{
    public async Task Consume(ConsumeContext<EquationCreated> context)
    {
        Console.WriteLine("--> Consuming equation created: " + context.Message.Equation + " = " + context.Message.Result);

        EquationItem item = new EquationItem
        {
            Equation = context.Message.Equation,
            Result = context.Message.Result
        };

        await item.SaveAsync();
    }
}