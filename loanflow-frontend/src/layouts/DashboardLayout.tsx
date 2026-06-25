import { Link, Outlet } from "react-router-dom";

function DashboardLayout() {
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
                    <span>Admin</span>
                </header>

                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;