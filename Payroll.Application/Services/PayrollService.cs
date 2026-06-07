using Payroll.Application.DTOs;
using Payroll.Application.Interfaces;

namespace Payroll.Application.Services;

public class PayrollService : IPayrollService
{
    private readonly IPayrollRepository _payrollRepository;

    public PayrollService(IPayrollRepository payrollRepository)
    {
        _payrollRepository = payrollRepository;
    }

    public async Task<PagedResponse<PayrollResultDto>> GetPayrollAsync(int month, int year, int pageNumber, int pageSize)
    {
        return await _payrollRepository.GetPayrollAsync(month, year, pageNumber, pageSize);
    }

    public async Task<PayrollResultDto?> GetPayslipAsync(int runId, int employeeId)
    {
        return await _payrollRepository.GetPayslipAsync(runId, employeeId);
    }

    public async Task RunPayrollAsync(int month, int year)
    {
        if (month < 1 || month > 12)
        {
            throw new ArgumentException("Invalid month.");
        }

        if (year < 2000)
        {
            throw new ArgumentException("Invalid year.");
        }

        await _payrollRepository.RunPayrollAsync(month, year);
    }
}