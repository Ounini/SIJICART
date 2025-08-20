import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Footer2 from "../components/Footer2";

function Success() {
  const { products } = useProduct();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <SearchBar products={products} />

      <Container fluid className="mb-4 pt-140 flex-grow-1">
        <div className="success-icon text-center">
          <i className="bi bi-check" />
        </div>
        <p className="text-center">
          Your order has been placed, check my orders for an update on your
          order.
        </p>

        <Row className="mx-0 gx-2 gy-2">
          <h5 className="font-16">Continue shopping</h5>
          {products.map((product) => (
            <Col xs={6} sm={4} md={3} xxl={2} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer2 />
      <Footer />
    </div>
  );
}

export default Success;
