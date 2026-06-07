import "./PayrollForm.css";
import { MONTHS } from "../constants/months";

interface Props {
    month: number;
    year: number;
    setMonth: (value: number) => void;
    setYear: (value: number) => void;
    onRunPayroll: () => void;
    onLoadPayroll: () => void;
}

export default function PayrollForm({
    month,
    year,
    setMonth,
    setYear,
    onRunPayroll,
    onLoadPayroll
}: Props) {

    return (
        <div className="form-card">

            <div className="form-row">

                <select
                    className="form-control"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                >
                    {MONTHS.map((monthName, index) => (
                        <option
                            key={index + 1}
                            value={index + 1}
                        >
                            {monthName}
                        </option>
                    ))}
                </select>

                <input
                    className="form-control"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                />

            </div>

            <div className="button-row">

                <button
                    className="primary-btn"
                    onClick={onRunPayroll}
                >
                    Run Payroll
                </button>

                <button
                    className="secondary-btn"
                    onClick={onLoadPayroll}
                >
                    Load Payroll
                </button>

            </div>

        </div>
    );
}