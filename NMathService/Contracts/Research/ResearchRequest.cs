namespace NMathService.Contracts.Research;

public record ResearchRequest(
    string Function,
    double Start = -10,
    double Final = 10,
    double Step = 1);