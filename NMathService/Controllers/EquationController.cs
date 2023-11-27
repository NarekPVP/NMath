using NMathService.Contracts.Equation;
using NMathService.Contracts.Research;
using NMathService.Services.Equation;
using Microsoft.AspNetCore.Mvc;
using NMathService.Common;

namespace NMathService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EquationController : ControllerBase
{
    private readonly IEquationService _equationService;

    public EquationController(IEquationService equationService)
    {
        _equationService = equationService;
    }

    [HttpPost("get-derivative")]
    public async Task<IActionResult> Derivate(EquationRequest request)
    {
        await Task.CompletedTask;
        string equation = request.Equation;

        try
        {
            EquationResult derivative = _equationService.Derivate(equation);

            return Ok(derivative);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPost("get-unacceptable-argument-values")]
    public IActionResult GetArgumentUnacceptableValues(
        EquationRequest request,
        int start = -10,
        int final = 10,
        int step = 1)
    {
        var unacceptableValues = _equationService.FindArgumentUnacceptableValues(
            equation: request.Equation,
            start: start,
            final: final,
            step: step);

        return Ok(unacceptableValues);
    }

    [HttpPost("research")]
    public IActionResult Research(ResearchRequest request)
    {
        if (request.Final < request.Start || request.Step > request.Final)
            BadRequest("Invalid input parameters.");

        EquationResult derivative = _equationService.Derivate(request.Function);
        EquationResult secondOrderDerivative = _equationService.SecondOrderDerivate(request.Function);

        var unacceptableValues = _equationService.FindArgumentUnacceptableValues(
            equation: request.Function,
            start: request.Start,
            final: request.Final,
            step: request.Step);

        string parity = _equationService.GetParity(request.Function);

        var (min, max) = _equationService.FindMinMax(
            request.Function,
            start: request.Start,
            final: request.Final,
            step: request.Step);

        List<double> asymptotes = _equationService.FindAsymptotes(request.Function);

        List<Point> points = _equationService.RunByRange(
            request.Function,
            start: request.Start,
            final: request.Final,
            step: request.Step);

        var researchResult = new ResearchResult(
            Function: request.Function,
            Derivative: derivative.Result,
            SecondOrderDerivative: secondOrderDerivative.Result,
            Parity: parity,
            UnacceptableArgumentValues: unacceptableValues,
            Min: min,
            Max: max,
            Asymptotes: asymptotes,
            Points: points);

        return Ok(researchResult);
    }
}