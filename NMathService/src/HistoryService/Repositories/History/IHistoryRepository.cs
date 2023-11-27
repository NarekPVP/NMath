using HistoryService.DTOs;

namespace HistoryService.Repositories.History;

public interface IHistoryRepository
{
    Task AddToHistory(CreateHistoryRequest request);
    void ClearHistory();
}