import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearCurrentProduct,
  getProductById,
  resetStatus,
} from "../../features/product/productSlice";
import AdminNav from "./AdminNav";

function AdminProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, status, error } = useSelector(
    (state) => state.product
  );

  const images = currentProduct?.images || [];

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProductById(id));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id, status]);

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!currentProduct) {
    return <div>No product found</div>;
  }

  return (
    <Container fluid>
      <AdminNav />
      <Link to={-1} className="back">
        <i className="bi bi-arrow-left" />
      </Link>
      <h1>{currentProduct.name}</h1>
      <p>
        <strong>Description:</strong> {currentProduct.description}
      </p>
      {currentProduct.formerPrice && (
        <p>
          <strong>Former Price:</strong> ${currentProduct.formerPrice}
        </p>
      )}
      <p>
        <strong>Price:</strong> ₦ {currentProduct.price}
      </p>
      <p>
        <strong>Category:</strong> {currentProduct.category}
      </p>
      <p>
        <strong>Sub Category:</strong> {currentProduct.subCategory}
      </p>
      <p>
        <strong>Stock:</strong> {currentProduct.countInStock}
      </p>
      <p>
        <strong>Colors:</strong> {currentProduct.colors.join(", ")}
      </p>
      <p>
        <strong>Rating:</strong> {currentProduct.rating}
      </p>
      <p>
        <strong>Number of Reviews:</strong> {currentProduct.numReviews}
      </p>
      <p>
        <strong>Last Updated At:</strong> {currentProduct.updatedAt}
      </p>
      <Row>
        {images.map((image, index) => (
          <Col xs={3} key={index}>
            <img
              width={"100%"}
              src={image}
              alt={`${currentProduct.name} Image - ${index}`}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminProductDetails;
