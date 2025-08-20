import logo from "../media/logo.png";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { justUrl } from "../utils/url";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function VerifyEmail() {
  const { currentUser } = useAuth();
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || currentUser?.email;

  console.log(email);

  useEffect(() => {
    const verified = localStorage.getItem("emailVerified");
    if (verified === "true") {
      // If email is verified, go to login automatically
      localStorage.removeItem("emailVerified");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        window.location.reload(); // reload the page when user comes back
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleResend = async () => {
    try {
      setResending(true);
      await justUrl.post("/users/send-verify-email", { email });
      setMessage("Verification email resent!");
    } catch (err) {
      setMessage("Something went wrong", err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      className="text-center LogIn d-flex justify-content-center align-items-center px-3"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <div className="text-center mt-4">
          <img src={logo} alt="Sijt Logo" className="logo" />
          <h1 className="welcome">Welcome to Sijicart</h1>
        </div>
        <p>A verification email has been sent to your inbox.</p>
        <Button
          style={{ backgroundColor: "#bf5700", border: "1px solid #bf5700" }}
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Resending..." : "Resend verification email"}
        </Button>

        {message && <p className="mt-3">{message}</p>}

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
    </div>
  );
}

export default VerifyEmail;
