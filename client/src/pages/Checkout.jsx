import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { justUrl } from "../utils/url";
import { useEffect, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { useProduct } from "../context/ProductContext";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";
import { GoBack } from "../components/GoBack";

function Checkout() {
  const navigate = useNavigate();
  const {
    cartItems,
    totalPrice,
    SHIPPING_FEE,
    formatPrice,
    clearCart,
    totalItemsPrice,
  } = useCart();
  const { currentUser, loading } = useAuth();
  const { products } = useProduct();
  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [toastText, setToastText] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    console.log("Auth loading:", loading);
    console.log("User logged in:", currentUser);
  }, [loading, currentUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(cartItems);

  const isFormComplete = formData.address && formData.city && formData.state;

  const handleOnDeliveryPayment = async () => {
    const { address, city, state } = formData;
    if (!address || !city || !state) {
      alert("Please fill in all shipping fields before proceeding.");
      return;
    }

    try {
      await justUrl.post("/orders", {
        userId: currentUser.id || currentUser._id,
        products: cartItems,
        amount: totalPrice,
        address: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
        },
        paymentMethod: "Pay on Delivery",
        paymentStatus: "Not Paid",
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      });
    } catch (err) {
      console.error("Order save failed", err);
    }
    clearCart();
    navigate("/success");
  };

  const handlePaystackPayment = () => {
    const { address, city, state } = formData;
    if (!address || !city || !state) {
      setShowToast(true);
      setToastBg("danger");
      setToastText("Please fill in all shipping fields before proceeding.");
      return;
    }

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: "pk_test_1a2da0d19b44731535cee0b9d41da20a4ff140fc",
      email: currentUser.email,
      amount: totalPrice * 100,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      onSuccess: async (transaction) => {
        try {
          await justUrl.post("/orders", {
            userId: currentUser._id || currentUser.id,
            products: cartItems,
            amount: totalPrice,
            address: {
              address: formData.address,
              city: formData.city,
              state: formData.state,
            },
            paymentMethod: "Paystack",
            paymentId: transaction.reference,
            paymentStatus: "Paid",
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
          });
          clearCart();
          navigate("/success");
        } catch (err) {
          console.error("Order save failed", err);
        }
      },
      onCancel: () => {
        setShowToast(true);
        setToastBg("danger");
        setToastText("Payment closed.");
      },
    });
  };

  if (loading || !currentUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BeatLoader color="#bf5700" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <SearchBar products={products} />
      <Container fluid className="pt-140">
        <GoBack />
        <h3 className="text-center pb-3 text-uppercase">Checkout</h3>

        <Row className="pb-5">
          <p className="text-danger text-center font-14">
            Make sure you fill the shipping address form before proceeding to
            payment
          </p>
          <Col sm={12} xl={6} xxl={6} lg={6} md={6} className="py-3 mx-auto">
            <h5>Shipping Address</h5>
            <Form.Control
              type="text"
              name="address"
              className="mb-2"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <Form.Control
              type="text"
              name="city"
              className="mb-2"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="mb-4"
              required
            />
          </Col>

          <Col sm={12} className="text-center">
            <h5>Summary</h5>
            <p>Subtotal: {formatPrice(totalItemsPrice)}</p>
            <p>Shipping: {formatPrice(SHIPPING_FEE)}</p>
            <h5>Total: {formatPrice(totalPrice)}</h5>
            <Button
              variant="success"
              disabled={!isFormComplete}
              onClick={handlePaystackPayment}
            >
              Pay with Paystack
            </Button>
            <Button
              className="mx-2"
              variant="secondary"
              onClick={handleOnDeliveryPayment}
            >
              Pay on delivery
            </Button>
          </Col>
        </Row>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          className="position-absolute top-0 end-0 p-3"
          bg={toastBg}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastText} </Toast.Body>
        </Toast>
      </Container>
      <Footer2 />
      <Footer />
    </>
  );
}

export default Checkout;
