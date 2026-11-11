import { Link } from "react-router-dom";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);

    const res = await fetch("http://localhost:5000/register", {
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
    <div className="register-form-container">
      <form method="post" onSubmit={handleSubmit} className="register-form">
        <h3>Register</h3>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
        <label htmlFor="email">IITK Email-ID</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <input style={{ marginBottom: 0 }} type="submit" value="REGISTER" />
        <Link to="/login">Already registered? Login here.</Link>
      </form>
    </div>
  );
}
