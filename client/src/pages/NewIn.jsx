import { useProduct } from "../context/ProductContext";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function NewIn() {
  const { products } = useProduct();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const newProducts = products.filter((product) => {
    const createdDate = new Date(product.createdAt);
    return createdDate >= sevenDaysAgo;
  });

  return (
    <>
      <Navbar />
      <SearchBar products={products} />

      <Container fluid className="pt-140 pb-4 order">
        <h2 className="text-center">Latest Drops</h2>
        <Row className="g-1">
          {newProducts.map((product) => (
            <Col xs={6} sm={4} md={3} xxl={2} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
      <Footer2 />
    </>
  );
}

export default NewIn;
