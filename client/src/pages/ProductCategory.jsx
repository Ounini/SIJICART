import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchProductsBySubCategory } from "../features/product/productSlice";
import { BeatLoader } from "react-spinners";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useProduct } from "../context/ProductContext";
import Footer2 from "../components/Footer2";

function ProductCategory() {
  const { products } = useProduct();
  const { category, subCategory } = useParams();
  const dispatch = useDispatch();
  const { selectedProducts, status, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(searchProductsBySubCategory({ category, subCategory }));
  }, [dispatch, category, subCategory]);

  if (status === "loading") {
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

  if (error)
    return <div>No Category or SubCategory Found Use The Search Bar</div>;

  return (
    <>
      <Navbar />
      <SearchBar products={products} />
      <Container fluid className="pt-140 mb-4">
        <h3 className="font-18 py-3" style={{ textTransform: "capitalize" }}>
          {category} <i className="bi bi-chevron-right"></i> {subCategory}
        </h3>

        {selectedProducts.length === 0 ? (
          <>
            <p className="text-center">No Products found</p>
          </>
        ) : (
          <Row className="g-1">
            {selectedProducts.map((product) => (
              <Col key={product._id} xs={6} sm={4} md={3} xxl={2}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <Footer2 />
      <Footer />
    </>
  );
}

export default ProductCategory;
