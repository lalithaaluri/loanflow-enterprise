import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveAuth } from "../../services/authService";

function Login() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin123");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            const data = await login(username, password);
            saveAuth(data.token, data.role);
            navigate("/");
        } catch {
            setError("Invalid username or password");
        }
    }

    return (
        <div className="page">
            <div className="card" style={{ maxWidth: "420px", margin: "80px auto" }}>
                <h2>LoanFlow Login</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>

                <p style={{ marginTop: "16px", fontSize: "14px" }}>
                    Admin: admin / admin123
                </p>
            </div>
        </div>
    );
}

export default Login;