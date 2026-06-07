using Payroll.Application.Interfaces;

namespace Payroll.Application.Services;

public class PayrollCalculator : IPayrollCalculator
{
    public decimal CalculateGrossPay(decimal basicSalary, int workingDays, int daysPresent)
    {
        return Math.Round((basicSalary / workingDays) * daysPresent, 2);
    }

    public decimal CalculatePF(decimal basicSalary)
    {
        return Math.Round(basicSalary * 0.12m, 2);
    }

    public decimal CalculateNetPay(decimal grossPay, decimal pfDeduction, decimal professionalTax)
    {
        return Math.Round(grossPay - pfDeduction - professionalTax, 2);
    }
}
