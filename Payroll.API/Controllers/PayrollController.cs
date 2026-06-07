using Microsoft.AspNetCore.Mvc;
using Payroll.Application.DTOs;
using Payroll.Application.Interfaces;

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

            return Created(string.Empty,
                            new ApiResponse<object>
                            {
                                Success = true,
                                Message = "Payroll generated successfully."
                            });
        }
        catch (PayrollAlreadyExistsException ex)
        {
            return Conflict(new ApiResponse<object>
            {
                Success = false,
                Message = ex.Message
            });
        }

        catch (AttendanceNotFoundException ex)
        {
            return BadRequest(new ApiResponse<object>
            {
                Success = false,
                Message = ex.Message
            });
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { Message = "An unexpected error occurred." });
        }
    }

    [HttpGet("{month:int}/{year:int}")]
    public async Task<IActionResult>
    GetPayroll(int month, int year)
    {
        var payroll = await _payrollService.GetPayrollAsync(month, year);

        if (!payroll.Any())
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = $"Payroll not found for {month}/{year}"
            });
        }

        return Ok(new ApiResponse<IEnumerable<PayrollResultDto>>
        {
            Success = true,
            Message = "Payroll retrieved successfully",
            Data = payroll
        });
    }

    [HttpGet("{runId:int}/slip/{employeeId:int}")]
    public async Task<IActionResult> GetPayslip(int runId, int employeeId)
    {
        var payslip = await _payrollService.GetPayslipAsync(runId, employeeId);

        if (payslip is null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Payslip not found"
            });
        }


        return Ok(new ApiResponse<PayrollResultDto>
        {
            Success = true,
            Message = "Payslip retrieved successfully",
            Data = payslip
        });
    }
}