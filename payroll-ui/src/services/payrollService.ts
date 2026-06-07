import axios from "axios";
import type { ApiResponse } from "../types/apiResponse";
import type { PayrollResult } from "../types/payroll";

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
  year: number
) => {
  return await api.get<ApiResponse<PayrollResult[]>>(
    `/payroll/${month}/${year}`
  );
};