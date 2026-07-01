import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, getRole } from "../services/authService";

function DashboardLayout() {
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <h2>LoanFlow</h2>

                <nav>
                    <Link to="/">Dashboard</Link>
                    <Link to="/customers">Customers</Link>
                    <Link to="/loans">Loans</Link>
                </nav>
            </aside>

            <main className="main-content">
                <header className="topbar">
                    <h1>LoanFlow Dashboard</h1>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <span>{getRole()}</span>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;