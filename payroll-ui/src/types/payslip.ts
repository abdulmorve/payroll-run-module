export interface Payslip {
    payrollRunId: number;
    employeeId: number;
    name: string;
    basicSalary: number;
    grossPay: number;
    pfDeduction: number;
    professionalTax: number;
    netPay: number;
}