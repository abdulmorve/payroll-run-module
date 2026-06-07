import { useState } from "react";
import PayrollForm from "../components/PayrollForm";
import PayrollTable from "../components/PayrollTable";
import PayslipModal from "../components/PayslipModal";
import { usePayroll } from "../hooks/usePayroll";
import { getPayslip } from "../services/payrollService";
import type { Payslip } from "../types/payslip";

export default function PayrollPage() {
    const [month, setMonth] = useState(6);
    const [year, setYear] = useState(2026);
    const [selectedPayslip, setSelectedPayslip] =
        useState<Payslip | null>(null);

    const {
        payroll,
        runPayrollAndLoad,
        loadPayroll
    } = usePayroll();

    const handleViewPayslip = async (
        runId: number,
        employeeId: number
    ) => {
        const response = await getPayslip(runId, employeeId);

        setSelectedPayslip(response.data.data!);
    };

    return (
        <div>
            <h1>Payroll Run Module</h1>

            <PayrollForm
                month={month}
                year={year}
                setMonth={setMonth}
                setYear={setYear}
                onRunPayroll={() => runPayrollAndLoad(month, year)}
                onLoadPayroll={() => loadPayroll(month, year)}
            />

            <PayrollTable
                payroll={payroll}
                onViewPayslip={handleViewPayslip}
            />

            <PayslipModal
                payslip={selectedPayslip}
                onClose={() => setSelectedPayslip(null)}
            />
        </div>
    );
}