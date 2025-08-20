import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser } from "../features/order/orderSlice";
import { useAuth } from "../context/AuthContext";
import { BeatLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { useProduct } from "../context/ProductContext";
import Footer from "../components/Footer";
import OrderCard from "../components/OrderCard";
import Footer2 from "../components/Footer2";
import ProductCard from "../components/ProductCard";

function Orders() {
  const dispatch = useDispatch();
  const { products, mostViewed } = useProduct();
  const { currentUser, loading } = useAuth();
  const { orders, status } = useSelector((state) => state.order);

  const [randomSuggestions, setRandomSuggestions] = useState([]);

  useEffect(() => {
    if (
      currentUser &&
      (currentUser._id || currentUser.id) &&
      status === "idle"
    ) {
      dispatch(fetchOrdersByUser(currentUser._id || currentUser.id));
    }
  }, [currentUser, dispatch, status]);

  useEffect(() => {
    const shuffled = [...mostViewed].sort(() => 0.5 - Math.random());
    setRandomSuggestions(shuffled.slice(0, 4));
  }, [mostViewed]);

  if (!loading && !currentUser) return <Navigate to="/login" />;

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
      {status === "loading" ? (
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
      ) : (
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <SearchBar products={products} />
          <Container fluid className="pt-140 order flex-grow-1 mb-3">
            <div className="my-3 text-uppercase text-center">
              <h1>Your Orders</h1>
              <hr className="lined " />
            </div>

            <Row>
              {orders.length > 0 ? (
                [...orders]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt) -
                      new Date(a.createdAt) -
                      new Date(a.createdAt)
                  )
                  .map((order) => (
                    <Col sm={12} key={order._id}>
                      <OrderCard order={order} />
                    </Col>
                  ))
              ) : (
                <>
                  <p className="text-center"> No orders found</p>

                  <Row className="g-1">
                    <h5 className="text-center mb-5">
                      Starting ordering from the most viewed products
                    </h5>

                    {randomSuggestions.map((product) => (
                      <Col key={product._id} xs={6} md={4} lg={3} xxl={2}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Row>
          </Container>
        </div>
      )}
      <Footer />
      <Footer2 />
    </>
  );
}

export default Orders;
