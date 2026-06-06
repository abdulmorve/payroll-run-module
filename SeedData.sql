-- Departments

INSERT INTO Departments (Name)
VALUES
('IT'),
('HR');


-- Employees

INSERT INTO Employees
(
    Name,
    DepartmentId,
    BasicSalary,
    IsActive
)
VALUES
('Ravi Sharma', 1, 30000, 1),
('Amit Kumar', 1, 45000, 1),
('Neha Patel', 1, 55000, 1),
('Priya Singh', 2, 40000, 1),
('John Dsouza', 2, 60000, 1);


-- Attendance (June 2026)

INSERT INTO Attendance
(
    EmployeeId,
    Month,
    Year,
    WorkingDays,
    DaysPresent
)
VALUES
(1, 6, 2026, 26, 24),
(2, 6, 2026, 26, 25),
(3, 6, 2026, 26, 22),
(4, 6, 2026, 26, 26),
(5, 6, 2026, 26, 20);