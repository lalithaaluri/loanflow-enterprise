import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
                <h2>🏦 LoanFlow</h2>

                <nav>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? "nav-link active-nav" : "nav-link"
                        }
                    >
                        🏠 Dashboard
                    </NavLink>

                    <NavLink
                        to="/customers"
                        className={({ isActive }) =>
                            isActive ? "nav-link active-nav" : "nav-link"
                        }
                    >
                        👥 Customers
                    </NavLink>

                    <NavLink
                        to="/loans"
                        className={({ isActive }) =>
                            isActive ? "nav-link active-nav" : "nav-link"
                        }
                    >
                        💰 Loans
                    </NavLink>
                </nav>
            </aside>

            <main className="main-content">
                <header className="topbar">
                    <div>
                        <h1>LoanFlow Dashboard</h1>
                        <p className="welcome-text">
                            Manage customers and loan applications
                        </p>
                    </div>

                    <div className="topbar-right">
        <span className="user-role">
            👤 {getRole()}
        </span>

                        <button className="logout-btn" onClick={handleLogout}>
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