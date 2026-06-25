import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Loans from "./pages/Loans";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="loans" element={<Loans />} />
            </Route>
        </Routes>
    );
}

export default App;