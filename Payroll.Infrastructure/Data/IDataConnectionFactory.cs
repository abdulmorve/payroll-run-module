using System.Data;

namespace Payroll.Infrastructure.Data;

public interface IDataConnectionFactory
{
    IDbConnection CreateConnection();
}