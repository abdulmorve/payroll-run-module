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
        <div>
            <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
            >
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>

            <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
            />

            <button onClick={onRunPayroll}>
                Run Payroll
            </button>
            <button onClick={onLoadPayroll}>
                Load Payroll
            </button>
        </div>
    );
}