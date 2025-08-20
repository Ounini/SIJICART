import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { justUrl } from "../utils/url";
import { GoBack } from "../components/GoBack";
import logo from "../media/logo.png";
import { Button, Form } from "react-bootstrap";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();

  const handleTheSubmit = async (e) => {
    e.preventDefault();

    try {
      await justUrl.post(`/users/reset-password/${token}`, { password });
      setMessage(" Password Reset Successful!");
      navigate("/login");
      console.log("Success!");
    } catch (err) {
      setMessage("An error occured!");
      console.error("Error!", err);
    }
  };

  return (
    <section className="p-3 mt-2">
      <GoBack />

      <div className="logIn mx-auto">
        <div className="text-center mt-4">
          <img src={logo} alt="Sijt Logo" className="logo" />
          <h1 className="welcome">Reset Password</h1>
          <p className="forgot-text">
            Reset your password here, write your new password below.
          </p>
        </div>

        <Form onSubmit={handleTheSubmit}>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Your New Password"
              required
            />
          </Form.Group>
          <p>{message}</p>
          <Button type="submit" className="w-100 form-btn">
            Submit
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

export default ResetPassword;
