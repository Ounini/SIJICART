import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Toast } from "react-bootstrap";

import { justUrl } from "../utils/url";
import logo from "../media/logo.png";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("Success");
  const [toastText, setToastText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !phone || !confirmPassword) {
      setShowToast(true);
      setToastBg("danger");
      setToastText("All fields are required");
      return;
    } else if (!emailRegex.test(email)) {
      setShowToast(true);
      setToastBg("danger");
      setToastText("Invalid email address");
      return;
    } else if (!passwordRegex.test(password)) {
      setShowToast(true);
      setToastBg("danger");
      setToastText(
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character"
      );
      return;
    } else if (phone.length <= 10) {
      setShowToast(true);
      setToastBg("danger");
      setToastText("Phone number must be 11 digit long, without country code");
      return;
    } else if (password !== confirmPassword) {
      setShowToast(true);
      setToastBg("danger");
      setToastText("Passwords do not match");
      return;
    }
    try {
      const response = await justUrl.post("/users/create", {
        name,
        email,
        password,
        phone,
      });

      await justUrl.post("/users/send-verify-email", { email });
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setConfirmPassword("");
      setShowToast(true);
      setToastBg("success");
      console.log(response);
      setToastText("Account created! Verification email sent.");
      navigate("/verify-email", { state: { from } });
    } catch (err) {
      setShowToast(true);
      setToastBg("danger");
      console.error(err);
      setToastText(err.response?.data || "Something went wrong");
    }
  };

  return (
    <section className="p-3 mt-5">
      <Link to={-1} className="back">
        <i className="bi bi-arrow-left" />
      </Link>

      <div className="logIn mx-auto">
        <div className="text-center mt-4">
          <img src={logo} alt="Sijcart Logo" className="logo" />
          <h1 className="welcome">Welcome to Sijicart</h1>
          <p style={{ marginBottom: "-30px" }}>
            Create your new account with us below
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-5" controlId="name">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <Form.Group className="mb-4" controlId="confirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 form-btn">
            Create account
          </Button>
        </Form>

        <div className="my-2 text-center">
          If you already have an account then
        </div>

        <Button className=" w-100 form-btn">
          <Link to="/login">Login</Link>
        </Button>

        <div className="mt-4 text-center">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="linked">
            Terms and Conditions
          </Link>
        </div>

        <div className="mt-4 text-center">
          For further support or problem creating an account, contact the
          support team{" "}
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
        <Toast.Body className="text-white">{toastText}</Toast.Body>
      </Toast>
    </section>
  );
}

export default SignUp;
