using Payroll.Application.Services;

namespace Payroll.Tests.Services;

public class PayrollCalculatorTests
{
    private readonly PayrollCalculator _calculator;

    public PayrollCalculatorTests()
    {
        _calculator = new PayrollCalculator();
    }

    [Fact]
    public void CalculateGrossPay_Should_Return_Correct_Value()
    {
        // Arrange
        decimal basicSalary = 30000m;
        int workingDays = 26;
        int daysPresent = 24;

        // Act
        var grossPay = _calculator.CalculateGrossPay(
            basicSalary,
            workingDays,
            daysPresent);

        // Assert
        Assert.Equal(27692.31m, grossPay);
    }

    [Fact]
    public void CalculatePF_Should_Return_Correct_Value()
    {
        // Arrange
        decimal basicSalary = 30000m;

        // Act
        var pf = _calculator.CalculatePF(basicSalary);

        // Assert
        Assert.Equal(3600m, pf);
    }

    [Fact]
    public void CalculateNetPay_Should_Return_Correct_Value()
    {
        // Arrange
        decimal grossPay = 27692.31m;
        decimal pfDeduction = 3600m;
        decimal professionalTax = 200m;

        // Act
        var netPay = _calculator.CalculateNetPay(
            grossPay,
            pfDeduction,
            professionalTax);

        // Assert
        Assert.Equal(23892.31m, netPay);
    }

    [Fact]
    public void CalculateNetPay_Should_Return_Negative_When_Deductions_Exceed_Gross()
    {
        // Arrange
        decimal grossPay = 1000m;
        decimal pfDeduction = 1200m;
        decimal professionalTax = 200m;

        // Act
        var netPay = _calculator.CalculateNetPay(
            grossPay,
            pfDeduction,
            professionalTax);

        // Assert
        Assert.Equal(-400m, netPay);
    }
}
