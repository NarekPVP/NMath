using MongoDB.Entities;

namespace HistoryService.Models;

public class EquationItem : Entity
{
    public string Equation { get; set; } = null!;
    public string Result { get; set; } = null!;
}