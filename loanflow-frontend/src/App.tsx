import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customer/Customers";
import Loans from "./pages/loans/Loans";
import AddLoan from "./pages/loans/AddLoan";
import EditLoan from "./pages/loans/EditLoan";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <Routes>
            {/* Login page (no sidebar) */}
            <Route path="/login" element={<Login />} />

            {/* Protected Dashboard */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="loans" element={<Loans />} />
                <Route path="loans/add" element={<AddLoan />} />
                <Route path="loans/edit/:id" element={<EditLoan />} />
            </Route>

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;