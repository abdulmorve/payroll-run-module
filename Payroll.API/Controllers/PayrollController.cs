using Microsoft.AspNetCore.Mvc;
using Payroll.Application.DTOs;
using Payroll.Application.Interfaces;
using Microsoft.Data.SqlClient;

namespace Payroll.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PayrollController : ControllerBase
{
    private readonly IPayrollService _payrollService;

    public PayrollController(IPayrollService payrollService)
    {
        _payrollService = payrollService;
    }

    [HttpPost("run")]
    public async Task<IActionResult> RunPayroll(RunPayrollRequestDto request)
    {
        try
        {
            await _payrollService.RunPayrollAsync(request.Month, request.Year);

            return Created(
                string.Empty,
                new
                {
                    Message =
                        "Payroll generated successfully."
                });
        }
        catch (SqlException ex)
            when (ex.Message.Contains(
                "Payroll already exists"))
        {
            return Conflict(
                new
                {
                    Message = ex.Message
                });
        }
    }

    [HttpGet("{month:int}/{year:int}")]
    public async Task<IActionResult>
    GetPayroll(int month, int year)
    {
        var payroll = await _payrollService.GetPayrollAsync(month, year);

        if (!payroll.Any())
        {
            return NotFound();
        }

        return Ok(payroll);
    }

    [HttpGet("{runId:int}/slip/{employeeId:int}")]
    public async Task<IActionResult> GetPayslip(int runId, int employeeId)
    {
        var payslip = await _payrollService.GetPayslipAsync(runId, employeeId);

        if (payslip is null)
            return NotFound();

        return Ok(payslip);
    }
}