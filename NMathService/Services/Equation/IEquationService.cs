using NMathService.Common;
using NMathService.Contracts.Equation;

namespace NMathService.Services.Equation;

public interface IEquationService
{
    EquationResult Derivate(string equation);
    EquationResult SecondOrderDerivate(string equation);
    double RunByArgument(string function, double x);
    List<double> FindArgumentUnacceptableValues(string equation, double start = -10, double final = 10, double step = 1);
    string GetParity(string equation);
    (double Min, double Max) FindMinMax(string equation, double start = -10, double final = 10, double step = 1);
    List<double> FindAsymptotes(string function, double start = -10, double final = 10, double step = 0.1);
    List<Point> RunByRange(string function, double start = -10, double final = 10, double step = 0.1);
}