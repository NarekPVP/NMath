using NMathService.Common;

namespace NMathService.Contracts.Research;

public record ResearchResult(
    string Function,
    string Derivative,
    string SecondOrderDerivative,
    string Parity,
    List<double> UnacceptableArgumentValues,
    double Min,
    double Max,
    List<double> Asymptotes,
    List<Point> Points);