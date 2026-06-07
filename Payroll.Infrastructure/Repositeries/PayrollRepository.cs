using System.Data;
using Dapper;
using Payroll.Application.DTOs;
using Payroll.Application.Interfaces;
using Payroll.Infrastructure.Data;

namespace Payroll.Infrastructure.Repositories;

public class PayrollRepository : IPayrollRepository
{
    private readonly IDataConnectionFactory _connectionFactory;

    public PayrollRepository(IDataConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<PayrollResultDto>>GetPayrollAsync(int month, int year)
    {
        using var connection = _connectionFactory.CreateConnection();

        var sql = @"SELECT
                    E.EmployeeId,
                    E.Name,
                    E.BasicSalary,
                    A.WorkingDays,
                    A.DaysPresent,
                    PD.GrossPay,
                    PD.PFDeduction,
                    PD.ProfessionalTax,
                    PD.NetPay
                FROM PayrollRun PR
                INNER JOIN PayrollDetails PD
                    ON PR.PayrollRunId = PD.PayrollRunId
                INNER JOIN Employees E
                    ON PD.EmployeeId = E.EmployeeId
                INNER JOIN Attendance A
                    ON E.EmployeeId = A.EmployeeId
                WHERE
                    PR.Month = @Month
                    AND PR.Year = @Year
                    AND A.Month = @Month
                    AND A.Year = @Year";

        return await connection.QueryAsync<PayrollResultDto>(
            sql,
            new
            {
                Month = month,
                Year = year
            });
    }

    public async Task<PayrollResultDto?> GetPayslipAsync(int runId, int employeeId)
    {
        using var connection = _connectionFactory.CreateConnection();

        var sql = @"SELECT
                    E.EmployeeId,
                    E.Name,
                    E.BasicSalary,
                    A.WorkingDays,
                    A.DaysPresent,
                    PD.GrossPay,
                    PD.PFDeduction,
                    PD.ProfessionalTax,
                    PD.NetPay
                FROM PayrollDetails PD
                INNER JOIN PayrollRun PR
                    ON PD.PayrollRunId = PR.PayrollRunId
                INNER JOIN Employees E
                    ON PD.EmployeeId = E.EmployeeId
                INNER JOIN Attendance A
                    ON E.EmployeeId = A.EmployeeId
                    AND A.Month = PR.Month
                    AND A.Year = PR.Year
                WHERE
                    PD.PayrollRunId = @RunId
                    AND PD.EmployeeId = @EmployeeId;";

        return await connection.QuerySingleOrDefaultAsync<PayrollResultDto>(
            sql,
            new { RunId = runId, EmployeeId = employeeId });
    }

    public async Task RunPayrollAsync(int month, int year)
    {
        using var connection = _connectionFactory.CreateConnection();

        var parameters = new DynamicParameters();

        parameters.Add("@Month", month);
        parameters.Add("@Year", year);

        await connection.ExecuteAsync("usp_RunPayroll", parameters, commandType: CommandType.StoredProcedure);
    }
}