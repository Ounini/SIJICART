import { Button, Col, Container, Row } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { useProduct } from "../context/ProductContext";
import CartCard from "../components/CartCard";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Cart() {
  const { products, popularProducts } = useProduct();
  const { cartItems, totalItemsPrice, SHIPPING_FEE, formatPrice } = useCart();

  console.log(totalItemsPrice);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <SearchBar products={products} />
      <Container fluid className="p-0 mb-4 pt-140">
        <h4 className="text-center py-3">My Cart</h4>{" "}
        <div className="d-flex justify-content-between align-items-center px-3 py-1 myCartHead mb-2">
          <span>{cartItems.length} Items</span>{" "}
          <span className="text-danger font-700">
            {formatPrice(totalItemsPrice)}
          </span>
        </div>
        <Row className="mx-0 g-1">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <Col xs={12} sm={6} xl={4} xxl={3} key={product._id}>
                <CartCard product={product} />
              </Col>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </Row>
        {cartItems.length > 0 && (
          <Button
            className="mx-auto d-block mt-3 w-50 text-uppercase font-700 checkoutBtn"
            onClick={() => navigate("/checkout")}
          >
            checkout
          </Button>
        )}
        <div className="p-3 mt-5">
          <h5 className="font-16">Customers also carted</h5>
          <Row className="mx-0 gx-2 gy-2">
            {popularProducts.map((product) => (
              <Col xs={6} sm={4} md={3} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <Footer />
      <Footer2 />
    </>
  );
}

export default Cart;
