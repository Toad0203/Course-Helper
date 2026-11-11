import { Link } from "react-router-dom";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/"); // ✅ Redirect to Home
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3>Login</h3>
        <label htmlFor="email">IITK Email-ID</label>
        <input type="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <input type="submit" value="LOGIN" />

        <div className="register-section">
          <Link to="/register">Don't have an account? Register here.</Link>
        </div>
      </form>
    </div>
  );
}
