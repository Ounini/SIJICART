import { Button, Form, Toast } from "react-bootstrap";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { justUrl } from "../utils/url";
import logo from "../media/logo.png";
import { useAuth } from "../context/AuthContext";
import { GoBack } from "../components/GoBack";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [toastText, setToastText] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setShowToast(true);
      setToastBg("danger");
      setToastText("All fields are required");
      return;
    }
    try {
      const response = await justUrl.post("/users/login", {
        email,
        password,
      });
      setEmail("");
      setPassword("");
      setShowToast(true);
      setToastBg("success");
      setToastText("User logged in successfully");
      const { token, user } = response.data;
      login(token, user);
      navigate(from, { replace: true });
    } catch (err) {
      setShowToast(true);
      setToastBg("danger");
      setToastText(err.response?.data || "Something went wrong");
    }
  };

  return (
    <section className="p-3 mt-5 logIn-section">
      <GoBack />

      <div className="logIn mx-auto">
        <div className="text-center mt-4">
          <img src={logo} alt="Sijt Logo" className="logo" />
          <h1 className="welcome">Welcome back!</h1>
          <p>Login to your existing account.</p>
        </div>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 form-btn">
            Login
          </Button>
        </Form>

        <p className="my-2 text-center px-4">
          <a
            style={{ color: "#bf5700", textDecoration: "none" }}
            href="/forgot-password"
          >
            Forgot Password?
          </a>
        </p>

        <div className="my-2 text-center px-4">
          If you havent created an account with us then
        </div>

        <Button href="/signup" className=" w-100 form-btn">
          Create an account
        </Button>

        <div className="mt-4 text-center">
          For further support or problem loging in, contact the support team{" "}
          <a target="_blank" href="mailto:support@sijt.com" className="linked">
            support@sijt.com
          </a>
        </div>
      </div>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-absolute top-0 end-0 p-3 mt-3"
        bg={toastBg}
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">{toastText} </Toast.Body>
      </Toast>
    </section>
  );
}

export default Login;
