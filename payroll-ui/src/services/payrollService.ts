import axios from "axios";
import type { ApiResponse } from "../types/apiResponse";
import type { PagedResponse } from "../types/pagedResponse.ts";
import type { PayrollResult } from "../types/payroll";
import type { Payslip } from "../types/payslip";

const api = axios.create({
  baseURL: "https://localhost:7025/api"
});

export const runPayroll = async (
  month: number,
  year: number
) => {
  return await api.post<ApiResponse<unknown>>(
    "/payroll/run",
    { month, year }
  );
};

export const getPayroll = async (
  month: number,
  year: number,
  pageNumber: number,
  pageSize: number
) => {
  return await api.get<ApiResponse<PagedResponse<PayrollResult>>>(
      `/payroll/${month}/${year}?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};

export const getPayslip = async (
  runId: number,
  employeeId: number
) => {
  return await api.get<ApiResponse<Payslip>>(
      `/payroll/${runId}/slip/${employeeId}`
  );
};