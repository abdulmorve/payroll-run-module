import "./PayrollPage.css";
import { useEffect, useState } from "react";
import PayrollForm from "../components/PayrollForm";
import PayrollTable from "../components/PayrollTable";
import PayslipModal from "../components/PayslipModal";
import Notification from "../components/Notification";
import { usePayroll } from "../hooks/usePayroll";
import { getPayslip } from "../services/payrollService";
import type { Payslip } from "../types/payslip";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

export default function PayrollPage() {
    const [month, setMonth] = useState(6);
    const [year, setYear] = useState(2026);
    const [selectedPayslip, setSelectedPayslip] =
        useState<Payslip | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 2;

    const {
        payroll,
        runPayrollAndLoad,
        loadPayroll,
        totalPages,
        loading,
        message,
        error,
    } = usePayroll();

    useEffect(() => {
        if (payroll.length > 0) {
            loadPayroll(
                month,
                year,
                pageNumber,
                pageSize
            );
        }
    }, [pageNumber]);
    
    const handleMonthChange = (value: number) => {
        setMonth(value);
        setPageNumber(1);
    };

    const handleYearChange = (value: number) => {
        setYear(value);
        setPageNumber(1);
    };
    const handleViewPayslip = async (
        runId: number,
        employeeId: number
    ) => {
        const response = await getPayslip(runId, employeeId);

        setSelectedPayslip(response.data.data!);
    };

    return (
        <div className="page">
            {loading && <LoadingSpinner />}
            <div className="page-header">
                <h1 className="page-title">
                    Payroll Run Module
                </h1>

                <p className="page-subtitle">
                    Generate and view payroll records
                </p>
            </div>
            {message && (
                <Notification
                    message={message}
                    type="success"
                />
            )}

            {error && (
                <Notification
                    message={error}
                    type="error"
                />
            )}
            <PayrollForm
                month={month}
                year={year}
                setMonth={handleMonthChange}
                setYear={handleYearChange}
                onRunPayroll={() => runPayrollAndLoad(month, year, pageNumber, pageSize)}
                onLoadPayroll={() => loadPayroll(month, year, pageNumber, pageSize)}
            />

            <PayrollTable
                payroll={payroll}
                onViewPayslip={handleViewPayslip}
            />
            <Pagination
                pageNumber={pageNumber}
                totalPages={totalPages}
                onPageChange={setPageNumber}
            />
            <PayslipModal
                payslip={selectedPayslip}
                onClose={() => setSelectedPayslip(null)}
            />
        </div>
    );
}