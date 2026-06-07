using Dapper;
using Payroll.Application.Interfaces;
using Payroll.Domain.Entities;
using Payroll.Infrastructure.Data;

namespace Payroll.Infrastructure.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly IDataConnectionFactory _connectionFactory;

    public EmployeeRepository(
        IDataConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<Employee>> GetEmployeesAsync()
    {
        using var connection =
            _connectionFactory.CreateConnection();

        var sql = """
                  SELECT
                      EmployeeId,
                      Name,
                      DepartmentId,
                      BasicSalary,
                      IsActive
                  FROM Employees
                  WHERE IsActive = 1
                  """;

        return await connection.QueryAsync<Employee>(sql);
    }
}