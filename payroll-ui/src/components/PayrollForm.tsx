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
    const isValidYear = year >= 2020 && year <= 2100;
    return (
        <div className="form-card">
            <div className="form-row">
                <div className="form-group">
                    <label>Month</label>
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
                </div>
                <div className="form-group">
                    <label>Year</label>
                    <input
                        className="form-control"
                        type="number"
                        min={2020}
                        max={2100}
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                    />
                    {!isValidYear && (
                        <small className="validation-error">
                            Year must be between 2020 and 2100
                        </small>
                    )}
                </div>
            </div>

            <div className="button-row">

                <button
                    className="primary-btn"
                    onClick={onRunPayroll}
                    disabled={!isValidYear}
                >
                    Run Payroll
                </button>

                <button
                    className="secondary-btn"
                    onClick={onLoadPayroll}
                    disabled={!isValidYear}
                >
                    Load Payroll
                </button>

            </div>

        </div>
    );
}