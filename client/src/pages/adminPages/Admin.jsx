import { Container } from "react-bootstrap";
import AdminNav from "./AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../features/product/productSlice";
import { useAuth } from "../../context/AuthContext";
import { fetchAllOrders } from "../../features/order/orderSlice";
import { getUsers } from "../../features/user/userSlice";

function Admin() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);
  const { orders, status: orderStatus } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchAllOrders(currentUser));
    }
  }, [dispatch, orderStatus, currentUser]);

  useEffect(() => {
    dispatch(getUsers());
    console.log("req ran");
  }, [dispatch]);

  if (status === "loading" || orderStatus === "loading") {
    <h1>Loading ...</h1>;
  }

  if (error) {
    <h1>No Product found</h1>;
  }

  return (
    <Container fluid>
      <AdminNav />
      <h1>Welcome Admin {currentUser.name}</h1>
      <div className="mt-4">
        <h5>Total Products listed:</h5>
        <p>{products.length}</p>
      </div>
      <div>
        <h5>Total Orders:</h5>
        <p>{orders.length}</p>
      </div>
      <div>
        <h5>Total Users:</h5>
        <p>{users.length}</p>
      </div>
    </Container>
  );
}

export default Admin;
