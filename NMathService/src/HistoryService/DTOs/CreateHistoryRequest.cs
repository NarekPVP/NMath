namespace HistoryService.DTOs;

public record CreateHistoryRequest(
    string Equation,
    string EquationResult);