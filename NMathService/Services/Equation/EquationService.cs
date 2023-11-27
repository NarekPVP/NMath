using NMathService.Contracts.Equation;
using MathNet.Symbolics;
using NMathService.Common;

namespace NMathService.Services.Equation;

public class EquationService : IEquationService
{
    private const double Epsilon = 1e-6;

    public EquationResult Derivate(string equation)
    {
        var x = SymbolicExpression.Variable("x");
        var expression = SymbolicExpression.Parse(equation);
        var derivative = expression.Differentiate(x);
        return new EquationResult(equation, derivative.ToString());
    }

    public EquationResult SecondOrderDerivate(string equation)
    {
        var x = SymbolicExpression.Variable("x");
        var expression = SymbolicExpression.Parse(equation);
        var derivative = expression.Differentiate(x);
        return new EquationResult(equation, derivative.Differentiate(x).ToString());
    }

    public double RunByArgument(string function, double x)
    {
        var variables = new Dictionary<string, FloatingPoint>
            {
                { "x", x }
            };

        var expression = Infix.ParseOrThrow(function);
        double result = Evaluate.Evaluate(variables, expression).RealValue;
        return result;
    }

    public List<double> FindArgumentUnacceptableValues(string equation, double start = -10, double final = 10, double step = 1)
    {
        var unacceptableValues = new HashSet<double>();

        for (double x = start; x <= final; x += step)
        {
            try
            {
                RunByArgument(equation, x);
            }
            catch (Exception)
            {
                unacceptableValues.Add(x);
            }
        }

        return unacceptableValues.ToList();
    }

    public string GetParity(string equation)
    {
        bool isEven = true;
        bool isOdd = true;

        for (double x = -10; x <= 10; x += 0.1)
        {
            double fX = RunByArgument(equation, x);
            double fMinusX = RunByArgument(equation, -x);

            if (Math.Abs(fMinusX + fX) > Epsilon)
                isOdd = false;

            if (Math.Abs(fMinusX - fX) > Epsilon)
                isEven = false;

            if (!isEven && !isOdd)
                return "NEITHER";
        }

        return isEven ? "EVEN" : (isOdd ? "ODD" : "NEITHER");
    }

    public (double Min, double Max) FindMinMax(string equation, double start = -10, double final = 10, double step = 1)
    {
        double min = double.MaxValue;
        double max = double.MinValue;

        for (double x = start; x <= final; x += step)
        {
            try
            {
                double result = RunByArgument(equation, x);
                min = Math.Min(min, result);
                max = Math.Max(max, result);
            }
            catch (Exception)
            {
                Console.WriteLine($"{x} is not acceptable");
            }
        }

        return (min, max);
    }

    public List<double> FindAsymptotes(string function, double start = -10, double final = 10, double step = 0.1)
    {
        var asymptotes = new List<double>();

        for (double x = start; x <= final; x += step)
        {
            try
            {
                double result = RunByArgument(function, x);

                // Check if the result is too large (positive or negative)
                if (double.IsInfinity(result))
                {
                    asymptotes.Add(x);
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        return asymptotes;
    }

    public List<Point> RunByRange(string function, double start = -10, double final = 10, double step = 0.1)
    {
        List<Point> points = new List<Point>();

        for (double x = start; x <= final; x += step)
        {
            try
            {
                points.Add(new Point()
                {
                    x = x,
                    y = RunByArgument(function, x)
                });
            }
            catch (Exception) { }
        }

        return points;
    }
}