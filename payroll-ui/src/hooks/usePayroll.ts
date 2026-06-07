import { useState } from "react";
import { getPayroll, runPayroll } from "../services/payrollService";
import type { PayrollResult } from "../types/payroll";

export function usePayroll() {
    const [payroll, setPayroll] = useState<PayrollResult[]>([]);
    const [loading, setLoading] = useState(false);

    const runPayrollAndLoad = async (month: number, year: number) => {
        try {
            setLoading(true);

            await runPayroll(month, year);

            const response = await getPayroll(month, year);

            setPayroll(response.data.data ?? []);
        }
        finally {
            setLoading(false);
        }
    };

    const loadPayroll = async (month: number, year: number) => {
        try {
            setLoading(true);
    
            const response = await getPayroll(month, year);
    
            setPayroll(response.data.data ?? []);
        }
        finally {
            setLoading(false);
        }
    };

    return {
        payroll,
        loading,
        runPayrollAndLoad,
        loadPayroll
    };
}