using Payroll.Application.DTOs;

namespace Payroll.Application.Interfaces;

public interface IPayrollRepository
{
    Task RunPayrollAsync(
        int month,
        int year);

    Task<IEnumerable<PayrollResultDto>> GetPayrollAsync(
        int month,
        int year);

    Task<PayrollResultDto?> GetPayslipAsync(
        int runId,
        int employeeId);
}