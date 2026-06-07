import type { PayrollResult } from "../types/payroll";

interface Props {
  payroll: PayrollResult[];
}

export default function PayrollTable({
  payroll
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}