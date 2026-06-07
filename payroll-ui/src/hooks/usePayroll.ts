import { useEffect, useState } from "react";
import { getPayroll, runPayroll } from "../services/payrollService";
import type { PayrollResult } from "../types/payroll";

export function usePayroll() {
    const [payroll, setPayroll] = useState<PayrollResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        if (!message && !error)
            return;
    
        const timer = setTimeout(() => {
            setMessage("");
            setError("");
        }, 4000);
    
        return () => clearTimeout(timer);
    }, [message, error]);

    const runPayrollAndLoad = async (month: number, year: number, pageNumber: number, pageSize: number) => {
        try {
            setLoading(true);
    
            setError("");
            setMessage("");
            setPayroll([]);
    
            await runPayroll(month, year);
    
            const response = await getPayroll(month, year,
                pageNumber,
                pageSize);
    
            setPayroll(response.data.data.data ?? []);
            setTotalPages(
                response.data.data.totalPages ?? 0
            );
            
            setTotalRecords(
                response.data.data.totalRecords
            );
            setMessage("Payroll generated successfully.");
        }
        catch (err: any) {
            setPayroll([]);
            setTotalPages(0);
            setTotalRecords(0);
            setError(
                err.response?.data?.message ??
                "Something went wrong."
            );
        }
        finally {
            setLoading(false);
        }
    };

    const loadPayroll = async (month: number, year: number, pageNumber: number, pageSize: number) => {
        try {
            setLoading(true);
    
            setError("");
            setMessage("");
            setPayroll([]);
    
            const response = await getPayroll(month, year,
                pageNumber,
                pageSize);
    
            setPayroll(response.data.data.data ?? []);
            setTotalPages(
                response.data.data.totalPages ?? 0
            );
            
            setTotalRecords(
                response.data.data.totalRecords
            );
            setMessage("Payroll loaded successfully.");
        }
        catch (err: any) {
            setPayroll([]);
            setTotalPages(0);
            setTotalRecords(0);
            setError(
                err.response?.data?.message ??
                "Unable to load payroll."
            );
        }
        finally {
            setLoading(false);
        }
    };

    return {
        payroll,
        loading,
        message,
        error,
        runPayrollAndLoad,
        loadPayroll,
        totalPages
    };
}