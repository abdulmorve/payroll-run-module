CREATE TABLE Departments
(
    DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);

CREATE TABLE Employees
(
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,

    Name NVARCHAR(200) NOT NULL,

    DepartmentId INT NOT NULL,

    BasicSalary DECIMAL(18,2) NOT NULL,

    IsActive BIT NOT NULL DEFAULT 1,

    CONSTRAINT FK_Employees_Departments
        FOREIGN KEY (DepartmentId)
        REFERENCES Departments(DepartmentId)
);

CREATE TABLE Attendance
(
    AttendanceId INT IDENTITY(1,1) PRIMARY KEY,

    EmployeeId INT NOT NULL,

    Month INT NOT NULL,

    Year INT NOT NULL,

    WorkingDays INT NOT NULL,

    DaysPresent INT NOT NULL,

    CONSTRAINT FK_Attendance_Employees
        FOREIGN KEY (EmployeeId)
        REFERENCES Employees(EmployeeId)
);

CREATE TABLE PayrollRun
(
    PayrollRunId INT IDENTITY(1,1) PRIMARY KEY,

    Month INT NOT NULL,

    Year INT NOT NULL,

    RunDate DATETIME2 NOT NULL
        DEFAULT GETDATE(),

    IsFinalized BIT NOT NULL DEFAULT 1
);

ALTER TABLE PayrollRun
ADD CONSTRAINT UQ_PayrollRun_Month_Year
UNIQUE (Month, Year);


CREATE TABLE PayrollDetails
(
    PayrollDetailId INT IDENTITY(1,1) PRIMARY KEY,

    PayrollRunId INT NOT NULL,

    EmployeeId INT NOT NULL,

    GrossPay DECIMAL(18,2) NOT NULL,

    PFDeduction DECIMAL(18,2) NOT NULL,

    ProfessionalTax DECIMAL(18,2) NOT NULL,

    NetPay DECIMAL(18,2) NOT NULL,

    CONSTRAINT FK_PayrollDetails_PayrollRun
        FOREIGN KEY (PayrollRunId)
        REFERENCES PayrollRun(PayrollRunId),

    CONSTRAINT FK_PayrollDetails_Employees
        FOREIGN KEY (EmployeeId)
        REFERENCES Employees(EmployeeId)
);

ALTER TABLE Employees
ADD CONSTRAINT CK_Employees_Salary
CHECK (BasicSalary > 0);

ALTER TABLE Attendance
ADD CONSTRAINT CK_Attendance_WorkingDays
CHECK (WorkingDays > 0);

ALTER TABLE Attendance
ADD CONSTRAINT CK_Attendance_PresentVsWorking
CHECK (DaysPresent <= WorkingDays); 

CREATE INDEX IX_Attendance_Employee_Month_Year
ON Attendance(EmployeeId, Month, Year);

CREATE INDEX IX_PayrollDetails_PayrollRunId
ON PayrollDetails(PayrollRunId);