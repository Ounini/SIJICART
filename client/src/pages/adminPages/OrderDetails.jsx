import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AdminNav from "./AdminNav";
import { useEffect } from "react";
import {
  // clearSelectedOrder,
  fetchOrderById,
} from "../../features/order/orderSlice";
import AdminOrderCard from "./AdminOrderCard";

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder, status, error } = useSelector((state) => state.order);

  console.log("selected order:", selectedOrder);
  console.log("status:", status);
  console.log("error:", error);

  useEffect(() => {
    console.log("ran");
    if (status === "idle") {
      dispatch(fetchOrderById(id));
    }

    // return () => {
    //   dispatch(clearSelectedOrder());
    // };
  }, [dispatch, id, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!selectedOrder) {
    return <div>No order found</div>;
  }

  return (
    <Container fluid>
      <AdminNav />
      <Link to={-1} className="back">
        <i className="bi bi-arrow-left" />
      </Link>
      <div className="orderCard mx-auto">
        <AdminOrderCard order={selectedOrder} />
      </div>
    </Container>
  );
}

export default OrderDetails;
