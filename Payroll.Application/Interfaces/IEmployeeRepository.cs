using Payroll.Domain.Entities;

namespace Payroll.Application.Interfaces;

public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetEmployeesAsync();
}