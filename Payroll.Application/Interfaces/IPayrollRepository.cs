using Payroll.Application.DTOs;

namespace Payroll.Application.Interfaces;

public interface IPayrollRepository
{
    Task RunPayrollAsync(
        int month,
        int year);

    Task<PagedResponse<PayrollResultDto>> GetPayrollAsync(
        int month,
        int year, 
        int pageNumber,
        int pageSize);

    Task<PayrollResultDto?> GetPayslipAsync(
        int runId,
        int employeeId);
}