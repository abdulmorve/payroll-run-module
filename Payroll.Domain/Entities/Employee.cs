namespace Payroll.Domain.Entities;

public class Employee
{
    public int EmployeeId { get; set; }

    public string Name { get; set; } = string.Empty;

    public int DepartmentId { get; set; }

    public decimal BasicSalary { get; set; }

    public bool IsActive { get; set; }
}