using ModelContextProtocol.Server;
using System.ComponentModel;

[McpServerToolType]
public class PayrollTools(HttpClient httpClient)
{
    [McpServerTool]
    [Description(
        "Retrieves payroll records for a given month and year. " +
        "Use this to identify pending payroll runs."
    )]
    public async Task<string> GetPayrollRecords(
        [Description("Month number, 1 to 12")] int month,
        [Description("Four-digit year")] int year)
    {
        var records = await httpClient.GetFromJsonAsync<object>(
            $"https://localhost:7025/api/payroll/{month}/{year}");

        return System.Text.Json.JsonSerializer.Serialize(records);
    }
}