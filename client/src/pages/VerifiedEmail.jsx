import { useParams } from "react-router-dom";

import logo from "../media/logo.png";
import { useEffect, useState } from "react";
import { justUrl } from "../utils/url";

function VerifiedEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await justUrl.get(`/users/verifyEmail/${token}`);
        localStorage.setItem("emailVerified", "true");
        setMessage(res.data);
      } catch (err) {
        setMessage(err.response?.data?.message || "Something went wrong");
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div>
      <div
        className="text-center LogIn d-flex justify-content-center align-items-center px-3"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <div className="text-center mt-4">
            <img src={logo} alt="Sijt Logo" className="logo" />
            <h1 className="welcome">Verify your email</h1>
          </div>
          <p className="welcome">{message}</p>
          <p>Go back previous website to login</p>
        </div>
      </div>
    </div>
  );
}

export default VerifiedEmail;
