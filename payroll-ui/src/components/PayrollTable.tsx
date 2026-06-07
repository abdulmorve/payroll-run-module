import "./PayrollTable.css";
import type { PayrollResult } from "../types/payroll";

interface Props {
  payroll: PayrollResult[];
  onViewPayslip: (runId: number, employeeId: number) => void;
}

export default function PayrollTable({
  payroll,
  onViewPayslip
}: Props) {
  
  if (!payroll.length) {
    return (
      <div className="empty-state">
        No payroll records found.
      </div>
    );
  }

  return (
    <div className="table-card">

      <div className="table-header">
        <h2 className="table-title">
          Payroll Results
        </h2>
      </div>

      <table className="payroll-table">

        <thead>
          <tr>
            <th>Employee</th>
            <th>Gross Pay</th>
            <th>PF</th>
            <th>Tax</th>
            <th>Net Pay</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payroll.map((item) => (
            <tr key={item.employeeId}>
              <td>{item.name}</td>

              <td>
                ₹{item.grossPay.toLocaleString()}
              </td>

              <td>
                ₹{item.pfDeduction.toLocaleString()}
              </td>

              <td>
                ₹{item.professionalTax.toLocaleString()}
              </td>

              <td className="net-pay">
                ₹{item.netPay.toLocaleString()}
              </td>

              <td>
                <button
                  className="payslip-btn"
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

    </div>
  );
}