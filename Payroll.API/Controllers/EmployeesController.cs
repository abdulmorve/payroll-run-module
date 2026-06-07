using Microsoft.AspNetCore.Mvc;
using Payroll.Application.DTOs;
using Payroll.Application.Interfaces;

namespace Payroll.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeesController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var employees = await _employeeService.GetEmployeesAsync();

        return Ok(new ApiResponse<IEnumerable<EmployeeDto>>
        {
            Success = true,
            Message = "Empoyees retrieved successfully",
            Data = employees
        });
    }
}