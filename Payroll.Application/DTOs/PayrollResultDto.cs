namespace Payroll.Application.DTOs;

public class PayrollResultDto
{
    public int EmployeeId { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal BasicSalary { get; set; }

    public int WorkingDays { get; set; }

    public int DaysPresent { get; set; }

    public decimal GrossPay { get; set; }

    public decimal PFDeduction { get; set; }

    public decimal ProfessionalTax { get; set; }

    public decimal NetPay { get; set; }
}