import type { PayrollResult } from "../types/payroll";

interface Props {
  payroll: PayrollResult[];
  onViewPayslip: (runId: number, employeeId: number) => void;
}

export default function PayrollTable({
  payroll,
  onViewPayslip
}: Props) {
  if (!payroll.length) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Gross</th>
          <th>PF</th>
          <th>Tax</th>
          <th>Net</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {payroll.map((item) => (
          <tr key={item.employeeId}>
            <td>{item.name}</td>
            <td>{item.grossPay}</td>
            <td>{item.pfDeduction}</td>
            <td>{item.professionalTax}</td>
            <td>{item.netPay}</td>
            <td>
              <button
                onClick={() =>
                  onViewPayslip(
                    item.payrollRunId,
                    item.employeeId
                  )
                }
              >
                View Payslip
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}