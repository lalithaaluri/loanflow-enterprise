import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customer/Customers";
import Loans from "./pages/loans/Loans";
import AddLoan from "./pages/loans/AddLoan";
import EditLoan from "./pages/loans/EditLoan";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="loans" element={<Loans />} />
                <Route path="loans/add" element={<AddLoan />} />
                <Route path="loans/edit/:id" element={<EditLoan />} />
            </Route>
        </Routes>
    );
}

export default App;