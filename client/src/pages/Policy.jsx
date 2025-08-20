import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { useProduct } from "../context/ProductContext";
import Footer from "../components/Footer";

function Policy() {
  const { products } = useProduct();

  return (
    <>
      <Navbar />
      <SearchBar products={products} />
      <Container className="pt-140 mb-5">
        <h3
          style={{
            border: "1px solid #bf5700",
            padding: "10px 20px",
            borderRadius: "10px",
            color: "#bf5700",
          }}
          className="text-center my-4"
        >
          Our Privacy Policy
        </h3>
        <div>
          <p>
            At Sijicart, your privacy is very important to us. This Privacy
            Policy explains how we collect, use, and protect your personal
            information when you visit or make a purchase from our website.
          </p>
          <ol>
            <li>
              <strong>Information We Collect </strong>
              <br />
              When you visit or shop from our website, we may collect the
              following:{" "}
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping address</li>
                <li>Payment information (bank or crypto wallet)</li>
                <li>Browser/device data (for analytics)</li>
              </ul>
            </li>
            <li className="my-3">
              <strong>How We Use Your Information</strong>
              <br /> We use your information to:{" "}
              <ul>
                <li>Process and deliver your orders</li>
                <li>Communicate with you (WhatsApp, email, SMS)</li>
                <li>Respond to customer support inquiries</li>
                <li>Improve your shopping experience </li>
                <li> Prevent fraud or illegal activity.</li>
              </ul>
            </li>
            <li>
              <strong>Sharing Your Information</strong>
              <br /> We do not sell or rent your personal information. We may
              share your data with:
              <ul>
                <li>Delivery partners (to ship your order)</li>
                <li>
                  Payment processors (Flutterwave, Paystack, or crypto gateways)
                </li>
                <li>Website tools (for analytics and improvement)</li>
              </ul>
              All partners are required to keep your data secure.
            </li>
            <li className="my-3">
              <strong>Your Rights</strong>
              <br /> You can:{" "}
              <ul>
                <li>Request access to your data</li>
                <li>Ask for correction or deletion of your data</li>
                <li>Withdraw consent at any time To do this</li>
              </ul>
              Contact us at{" "}
              <a style={{ color: "#bf5700" }} href="mailto:support@sijt.com">
                support@sijt.com
              </a>{" "}
              or on WhatsApp at{" "}
              <a style={{ color: "#bf5700" }} href="tel:+2348069800261">
                +234 806 980 0261
              </a>
              .
            </li>
            <li>
              <strong>Data Security</strong>
              <br />
              We protect your data using:
              <ul>
                <li>SSL encryption</li>
                <li>Secure payment gateways</li>
                <li>Restricted access to customer data</li>
              </ul>
              However, no method of online transmission is 100% secure, so we
              cannot guarantee absolute security.
            </li>
            <li className="my-3">
              <strong>Cookies</strong>
              <br /> Our website may use cookies to improve performance and your
              browsing experience. You can choose to disable cookies in your
              browser settings.
            </li>
            <li>
              <strong>Third-Party Links</strong> <br /> Sometimes we may include
              links to third-party websites. We are not responsible for the
              privacy practices of those websites.
            </li>
            <li className="my-3">
              <strong>Changes to This Policy</strong>
              <br />
              We may update this policy occasionally. All changes will be posted
              here with the updated date above.
            </li>
            <li>
              <strong>Contact Us</strong>
              <br />
              If you have questions about this Privacy Policy or how we handle
              your data, contact us at:{" "}
              <a style={{ color: "#bf5700" }} href="mailto:support@sijt.com">
                support@sijt.com
              </a>{" "}
              or{" "}
              <a style={{ color: "#bf5700" }} href="tel:+2348069800261">
                +234 806 980 0261
              </a>
              .
            </li>
          </ol>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Policy;
