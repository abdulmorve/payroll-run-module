CREATE OR ALTER PROCEDURE usp_RunPayroll
(
    @Month INT,
    @Year INT
)
AS
BEGIN
    SET NOCOUNT ON;

    -----------------------------------------------------
    -- Check duplicate payroll run
    -----------------------------------------------------

    IF EXISTS
    (
        SELECT 1
        FROM PayrollRun
        WHERE Month = @Month
          AND Year = @Year
    )
    BEGIN
        RAISERROR(
            'Payroll already exists for the selected month and year.',
            16,
            1
        );

        RETURN;
    END

    BEGIN TRANSACTION
    -----------------------------------------------------
    -- Create Payroll Run
    -----------------------------------------------------

    INSERT INTO PayrollRun
    (
        Month,
        Year,
        RunDate,
        IsFinalized
    )
    VALUES
    (
        @Month,
        @Year,
        GETDATE(),
        1
    );

    DECLARE @PayrollRunId INT;

    SET @PayrollRunId = SCOPE_IDENTITY();

    -----------------------------------------------------
    -- Calculate Payroll
    -----------------------------------------------------

    INSERT INTO PayrollDetails
    (
        PayrollRunId,
        EmployeeId,
        GrossPay,
        PFDeduction,
        ProfessionalTax,
        NetPay
    )
    SELECT
        @PayrollRunId,

        E.EmployeeId,

        ROUND(
            (E.BasicSalary / A.WorkingDays)
            * A.DaysPresent,
            2
        ) AS GrossPay,

        ROUND(
            E.BasicSalary * 0.12,
            2
        ) AS PFDeduction,

        200 AS ProfessionalTax,

        ROUND(
            (
                (E.BasicSalary / A.WorkingDays)
                * A.DaysPresent
            )
            -
            (E.BasicSalary * 0.12)
            -
            200,
            2
        ) AS NetPay

    FROM Employees E
    INNER JOIN Attendance A
        ON E.EmployeeId = A.EmployeeId

    WHERE
        A.Month = @Month
        AND A.Year = @Year
        AND E.IsActive = 1;
    COMMIT TRANSACTION
    -----------------------------------------------------
    -- Return Summary
    -----------------------------------------------------

    SELECT
        PayrollRunId,
        Month,
        Year,
        RunDate,
        IsFinalized
    FROM PayrollRun
    WHERE PayrollRunId = @PayrollRunId;
END
GO