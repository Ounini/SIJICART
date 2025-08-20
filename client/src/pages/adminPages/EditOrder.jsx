import { Button, Container, Toast, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AdminNav from "./AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearSelectedOrder,
  fetchOrderById,
  resetStatus,
  updateOrder,
} from "../../features/order/orderSlice";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

function EditOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { formatPrice } = useCart();
  const { selectedOrder, status, error } = useSelector((state) => state.order);

  console.log(selectedOrder);

  useEffect(() => {
    console.log("req ran");
    dispatch(fetchOrderById(id));
    return () => {
      dispatch(clearSelectedOrder());
      dispatch(resetStatus());
    };
  }, [dispatch, id]);

  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [toastText, setToastText] = useState("");

  const [updatedOrder, setUpdatedOrder] = useState({
    address: {
      address: "",
      city: "",
      state: "",
    },
    amount: 0,
    email: "",
    isPaid: false,
    paymentMethod: "",
    phone: "",
    status: "",
  });

  useEffect(() => {
    if (selectedOrder) {
      setUpdatedOrder({
        address: {
          address: selectedOrder.address?.address || "",
          city: selectedOrder.address?.city || "",
          state: selectedOrder.address?.state || "",
        },
        amount: selectedOrder.amount || 0,
        email: selectedOrder.email || "",
        isPaid: selectedOrder.isPaid || false,
        paymentMethod: selectedOrder.paymentMethod || "",
        phone: selectedOrder.phone || "",
        status: selectedOrder.status || "",
      });
    }
  }, [selectedOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder({
      ...updatedOrder,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(updateOrder({ id, updatedOrder }));
      setShowToast(true);
      setToastBg("success");
      setToastText("Order Updated");
    } catch (err) {
      console.error("Error: ", err);
      setShowToast(true);
      setToastBg("danger");
      setToastText("Something went wrong");
    }
  };

  if (status === "failed") return <div>Error: {error}</div>;
  if (!selectedOrder) return <div>Loading order...</div>;

  return (
    <Container fluid>
      <AdminNav />
      <Link to={-1} className="back">
        <i className="bi bi-arrow-left" />
      </Link>
      <h1>Edit Order</h1>
      <h5 className="text-center my-5">
        Order Id: {selectedOrder._id || selectedOrder.id}
      </h5>

      <Form onSubmit={handleSubmit} className="shapeForm">
        <Form.Group className="mb-3">
          <Form.Label htmlFor="address">Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder={selectedOrder.address.address}
            value={updatedOrder.address.address || ""}
            onChange={(e) =>
              setUpdatedOrder({
                ...updatedOrder,
                address: {
                  ...updatedOrder.address,
                  address: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="city">City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder={selectedOrder.address.city}
            value={updatedOrder.address.city || ""}
            onChange={(e) =>
              setUpdatedOrder({
                ...updatedOrder,
                address: {
                  ...updatedOrder.address,
                  city: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="state">State</Form.Label>
          <Form.Control
            name="state"
            type="text"
            placeholder={selectedOrder.address.state}
            value={updatedOrder.address.state || ""}
            onChange={(e) =>
              setUpdatedOrder({
                ...updatedOrder,
                address: {
                  ...updatedOrder.address,
                  state: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="amount">Amount</Form.Label>
          <Form.Control
            name="amount"
            type="number"
            placeholder={formatPrice(selectedOrder.amount)}
            value={updatedOrder.amount || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder={selectedOrder.email}
            value={updatedOrder.email || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="paymentStatus">Payment Status</Form.Label>
          <Form.Select
            name="isPaid"
            value={updatedOrder.isPaid || ""}
            onChange={(e) =>
              setUpdatedOrder({ ...updatedOrder, isPaid: e.target.value })
            }
          >
            <option value={selectedOrder.isPaid}>
              {selectedOrder.isPaid === false ? "Not Paid" : "Paid"}
            </option>
            {selectedOrder.isPaid === true && (
              <option value={false}>Not Paid</option>
            )}
            {selectedOrder.isPaid === false && (
              <option value={true}>Paid</option>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="paymentMethod">Payment Method</Form.Label>
          <Form.Select
            name="paymentMethod"
            value={updatedOrder.paymentMethod || ""}
            onChange={(e) =>
              setUpdatedOrder({
                ...updatedOrder,
                paymentMethod: e.target.value,
              })
            }
          >
            <option value={selectedOrder.paymentMethod}>
              {selectedOrder.paymentMethod}
            </option>
            {selectedOrder.paymentMethod === "Paystack" && (
              <option value="Pay on Delivery">Pay on Delivery</option>
            )}
            {selectedOrder.paymentMethod === "Pay on Delivery" && (
              <option value="Paystack">Paystack</option>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">Phone Number</Form.Label>
          <Form.Control
            name="phone"
            type="tel"
            placeholder={selectedOrder.phone}
            value={updatedOrder.phone || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="status">Order Status</Form.Label>
          <Form.Select
            name="status"
            value={updatedOrder.status || ""}
            onChange={(e) =>
              setUpdatedOrder({ ...updatedOrder, status: e.target.value })
            }
          >
            <option value={selectedOrder.status}>{selectedOrder.status}</option>
            {selectedOrder.status === "pending" && (
              <>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
              </>
            )}
            {selectedOrder.status === "delivered" && (
              <>
                <option value="pending">Pending</option>
                <option value="dispatched">Dispatched</option>
              </>
            )}
            {selectedOrder.status === "dispatched" && (
              <>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
              </>
            )}
          </Form.Select>
        </Form.Group>
        <Button className="mb-10" type="submit">
          Update Order
        </Button>
      </Form>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-fixed top-0 end-0 p-3 mt-5"
        bg={toastBg}
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">{toastText} </Toast.Body>
      </Toast>
    </Container>
  );
}

export default EditOrder;
