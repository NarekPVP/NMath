using HistoryService.DTOs;
using HistoryService.Models;
using MongoDB.Entities;

namespace HistoryService.Repositories.History;

public class HistoryRepository : IHistoryRepository
{
    public async Task AddToHistory(CreateHistoryRequest request)
    {
        EquationItem item = new EquationItem
        {
            Equation = request.Equation,
            Result = request.EquationResult
        };

        await item.SaveAsync();
    }

    public void ClearHistory()
    {
        throw new NotImplementedException();
    }
}