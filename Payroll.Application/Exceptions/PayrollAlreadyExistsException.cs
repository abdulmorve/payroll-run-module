public class PayrollAlreadyExistsException : Exception
{
    public PayrollAlreadyExistsException(string message)
        : base(message) { }
}