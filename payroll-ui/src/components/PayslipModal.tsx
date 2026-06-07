import "./PayslipModal.css";
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
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 className="modal-title">
                        Employee Payslip
                    </h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    
                    <div className="employee-name">
                        {payslip.name}
                    </div>

                    <div className="salary-grid">

                        <div className="salary-item">
                            <div className="salary-label">
                                Basic Salary
                            </div>

                            <div className="salary-value">
                                ₹{payslip.basicSalary.toLocaleString()}
                            </div>
                        </div>

                        <div className="salary-item">
                            <div className="salary-label">
                                Gross Pay
                            </div>

                            <div className="salary-value">
                                ₹{payslip.grossPay.toLocaleString()}
                            </div>
                        </div>

                        <div className="salary-item">
                            <div className="salary-label">
                                PF Deduction
                            </div>

                            <div className="salary-value">
                                ₹{payslip.pfDeduction.toLocaleString()}
                            </div>
                        </div>

                        <div className="salary-item">
                            <div className="salary-label">
                                Professional Tax
                            </div>

                            <div className="salary-value">
                                ₹{payslip.professionalTax.toLocaleString()}
                            </div>
                        </div>

                    </div>

                    <div className="net-pay-card">

                        <div className="net-pay-label">
                            Net Pay
                        </div>

                        <div className="net-pay-value">
                            ₹{payslip.netPay.toLocaleString()}
                        </div>

                    </div>
                    <div className="modal-actions">

                        <button
                            className="print-btn"
                            onClick={() => {
                                document.body.classList.add("printing");
                            
                                window.print();
                            
                                document.body.classList.remove("printing");
                            }}
                        >
                            Print Payslip
                        </button>

                        <button
                            className="close-action-btn"
                            onClick={onClose}
                        >
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}