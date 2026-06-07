import { useState } from "react";
import PayrollForm from "./components/PayrollForm";
import PayrollTable from "./components/PayrollTable";
import { usePayroll } from "./hooks/usePayroll";

function App() {
    const [month, setMonth] = useState(6);
    const [year, setYear] = useState(2026);

    const {
        payroll,
        runPayrollAndLoad,
        loadPayroll
    } = usePayroll();

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

            <PayrollTable payroll={payroll} />
        </div>
    );
}

export default App;