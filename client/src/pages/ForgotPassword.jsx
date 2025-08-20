import { Button, Form } from "react-bootstrap";
import { GoBack } from "../components/GoBack";
import { useState } from "react";
import { justUrl } from "../utils/url";
import logo from "../media/logo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //   const from = location.state?.from || "/";

  const handleTheSubmit = async (e) => {
    e.preventDefault();

    try {
      await justUrl.post("/users/forgotten-password", { email });
      setMessage(" Reset Link sent Successfully!");
      console.log("Success!");
    } catch (err) {
      setMessage("An error occured!");
      console.error("Error!", err);
    }
  };
  return (
    <section className="p-3 mt-5 logIn-section">
      <GoBack />

      <div className="logIn mx-auto">
        <div className="text-center mt-4">
          <img src={logo} alt="Sijt Logo" className="logo" />
          <h1 className="welcome">Forgot Password</h1>
          <p className="forgot-text">
            You can request a password reset below. We will send a security code
            to the email address, please make sure it is correct.
          </p>
        </div>

        <Form onSubmit={handleTheSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <p>{message}</p>
          <Button type="submit" className="w-100 form-btn">
            Reset
          </Button>
        </Form>

        <div className="mt-4 text-center">
          For further support, contact the support team{" "}
          <a target="_blank" href="mailto:support@sijt.com" className="linked">
            support@sijt.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
