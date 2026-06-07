using Payroll.Application.DTOs;
using Payroll.Application.Interfaces;

namespace Payroll.Application.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeService(
        IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task<IEnumerable<EmployeeDto>> GetEmployeesAsync()
    {
        var employees =
            await _employeeRepository.GetEmployeesAsync();

        return employees.Select(x => new EmployeeDto
        {
            EmployeeId = x.EmployeeId,
            Name = x.Name,
            BasicSalary = x.BasicSalary
        });
    }
}