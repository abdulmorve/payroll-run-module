namespace Payroll.Application.Interfaces;

public interface IPayrollCalculator
{
    decimal CalculateGrossPay(decimal basicSalary, int workingDays, int daysPresent);

    decimal CalculatePF(decimal basicSalary);

    decimal CalculateNetPay(decimal grossPay, decimal pfDeduction, decimal professionalTax);
}
