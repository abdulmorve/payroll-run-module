public class AttendanceNotFoundException : Exception
{
    public AttendanceNotFoundException(string message)
        : base(message) { }
}