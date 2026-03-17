import { useState } from "react";
import "./login.scss";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const { login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }

    } catch (err) {
      console.log(err);
      alert("Authentication failed");
    }
  };

  return (
    <div className="login">

      <div className="loginCard">

        <h2>{isRegister ? "Create Account" : "Login"}</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>
            {isRegister ? "Register" : "Login"}
          </button>

        </form>

        <p onClick={() => setIsRegister(!isRegister)}>

          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}

        </p>

      </div>

    </div>
  );
};

export default Login;