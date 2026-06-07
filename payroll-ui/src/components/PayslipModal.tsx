import type { Payslip } from "../types/payslip";

interface Props {
    payslip: Payslip | null;
    onClose: () => void;
}

export default function PayslipModal({
    payslip,
    onClose
}: Props) {
    if (!payslip) return null;

    return (
        <div>
            <h2>Payslip</h2>

            <p>Name: {payslip.name}</p>
            <p>Basic Salary: {payslip.basicSalary}</p>
            <p>Gross Pay: {payslip.grossPay}</p>
            <p>PF Deduction: {payslip.pfDeduction}</p>
            <p>Professional Tax: {payslip.professionalTax}</p>
            <p>Net Pay: {payslip.netPay}</p>

            <button onClick={onClose}>
                Close
            </button>
        </div>
    );
}