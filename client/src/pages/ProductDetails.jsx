import { Button, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { useProduct } from "../context/ProductContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { BeatLoader } from "react-spinners";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { justUrl } from "../utils/url";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";
import Footer2 from "../components/Footer2";

function ProductDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productName } = useParams();
  const { formatPrice, addToCart } = useCart();
  const { products, mostViewed } = useProduct();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [randomSuggestions, setRandomSuggestions] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const found = products.find((product) => product.name === productName);
      setProduct(found);
      setLoading(false);
      setValue(found.rating);
      setSelectedColor(found.colors?.[0]);
    }, 300);

    return () => clearTimeout(timeout);
  }, [productName, products]);

  useEffect(() => {
    if (!loading && product) {
      const viewed = JSON.parse(sessionStorage.getItem("ViewedProducts")) || [];

      if (!viewed.includes(product._id)) {
        justUrl.patch(`/products/viewed/${product._id}`);
        viewed.push(product._id);
        sessionStorage.setItem("ViewedProducts", JSON.stringify(viewed));
      }
    }
  }, [loading, product]);

  useEffect(() => {
    if (product) {
      // const related = mostViewed.filter(
      //   (p) =>
      //     p._id !== product._id &&
      //     p.category.toLowerCase() === product.category.toLowerCase()
      // );
      const shuffled = mostViewed.sort(() => 0.5 - Math.random());
      setRandomSuggestions(shuffled.slice(0, 4));
    }
  }, [product, mostViewed]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setSubmitting(true);
    try {
      console.log(product._id);
      const res = await justUrl.post(`/products/productReview/${product._id}`, {
        rating: userRating,
        comment: userComment,
        userId: currentUser._id || currentUser.id,
      });
      setSuccessMessage("Review submitted successfully");
      setUserRating(0);
      setUserComment("");

      // Update frontend with new review
      setProduct(res.data.product);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (!product || loading) {
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
      <Container fluid className="pt-140 mb-4 productDetails">
        <Row>
          <Col xs={12} lg={6}>
            <div className="proCaro-div">
              <Carousel
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                }}
                className="product-carousel"
              >
                {product.images.map((image, index) => (
                  <Carousel.Item
                    key={index}
                    interval={30000}
                    className="product-item"
                  >
                    <img
                      className="w-100 p-4 product-image"
                      src={image}
                      alt={product.name}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col className="d-none d-lg-block">
            <div className="sideDetail">
              <h5 className="font-18 text-uppercase">{product.name}</h5>
              <p className="font-12 my-0" style={{ color: "#bf5700" }}>
                Same day delivery within Abuja
              </p>
              <span
                className="font-16 mr-10"
                style={{ color: "#bf5700", fontWeight: 600 }}
              >
                {formatPrice(product.price)}
              </span>
              {product.formerPrice && (
                <span>
                  <del>{formatPrice(product.formerPrice)}</del>
                </span>
              )}
              <div>
                <Rating
                  name="rate-product"
                  defaultValue={value || 0}
                  readOnly
                />
                <p className="font-14">
                  Hurry Up!{" "}
                  <span style={{ color: "#bf5700" }}>
                    {product.countInStock}
                  </span>{" "}
                  left
                </p>
              </div>
              <div className="detailColor">
                {product.colors && (
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <Form.Select
                      aria-label={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      {product.colors.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))}
                    </Form.Select>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: selectedColor,
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                )}
                <div className="d-flex align-items-center gap-2 mt-2">
                  <p className="my-auto">Quantity</p>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    –
                  </Button>
                  <span className="font-14">{quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <hr />
              <div className="detailBtn-div">
                <Button
                  className="w-100 detailCart"
                  disabled={product.countInStock === 0}
                  onClick={() =>
                    addToCart({ ...product, selectedColor, quantity })
                  }
                >
                  {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-4 ">
          <Col xs={8} lg={12}>
            <div className="d-block d-lg-none">
              <h5 className="font-18 text-uppercase">{product.name}</h5>
              <p className="font-12 my-0" style={{ color: "#bf5700" }}>
                Same day delivery within Abuja
              </p>
              <span
                className="font-16 mr-10"
                style={{ color: "#bf5700", fontWeight: 600 }}
              >
                {formatPrice(product.price)}
              </span>
              {product.formerPrice && (
                <span>
                  <del>{formatPrice(product.formerPrice)}</del>
                </span>
              )}
            </div>

            <div className="product-des d-flex justify-content-center">
              <div>
                <p
                  className="font-18"
                  style={{
                    fontWeight: 600,
                    border: "1px solid #58355e",
                    width: 250,
                    borderRadius: "10px",
                    backgroundColor: "#58355e",
                    color: "white",
                    padding: "5px 0",
                    textAlign: "center",
                  }}
                >
                  Product Description
                </p>
                <ul className="-mt-10">
                  {product.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
          <Col xs={4} className="d-block d-lg-none">
            <Rating name="rate-product" defaultValue={value || 0} readOnly />
            <p className="font-14">
              Hurry Up!{" "}
              <span style={{ color: "#bf5700" }}>{product.countInStock}</span>{" "}
              left
            </p>
          </Col>
        </Row>
        <hr />
        <div className="detailColor d-block d-lg-none">
          {product.colors && (
            <div className="d-flex align-items-center gap-2 mt-2">
              <Form.Select
                aria-label={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {product.colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </Form.Select>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: selectedColor,
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}
          <div className="d-flex align-items-center gap-2 mt-4">
            <p className="my-auto">Quantity</p>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              –
            </Button>
            <span className="font-14">{quantity}</span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </Button>
          </div>
        </div>
        <hr className="d-none d-lg-none" />
        <div className="detailBtn-div d-block d-lg-none">
          <Button
            className="w-100 detailCart"
            disabled={product.countInStock === 0}
            onClick={() => addToCart({ ...product, selectedColor, quantity })}
          >
            {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>

        <hr />
        <Row className="mt-4">
          <Col xs={12} className="review-col">
            <div className="review-div">
              <h5 className="font-16">Write a Review</h5>
              <form onSubmit={handleReviewSubmit}>
                <Rating
                  name="user-rating"
                  value={userRating}
                  onChange={(e, newValue) => setUserRating(newValue)}
                />
                <textarea
                  className="form-control my-2"
                  rows="3"
                  placeholder="Write your comment here..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="btn btn-warning"
                  disabled={submitting || !userRating || !userComment}
                  style={{ marginBottom: 30 }}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                {successMessage && (
                  <p className="text-success mt-2">{successMessage}</p>
                )}
              </form>
              {product.reviews && product.reviews.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-16">Customer Reviews</h5>
                  {product.reviews.map((rev, idx) => (
                    <>
                      <div key={idx} className="mb-3">
                        {console.log(rev)}
                        <p>{rev.userName}</p>
                        <Rating value={rev.rating} readOnly />
                        <p className="mb-0">{rev.comment}</p>
                        <small className="text-muted">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <hr />
                    </>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
        <aside>
          <a href="/policy" style={{ color: "#bf5700" }}>
            Click here to see our delivery and return policy
          </a>
        </aside>
        <hr />
        <Row className="mt-3 g-1">
          <h4 className="font-18 font-600">You might also like</h4>
          {randomSuggestions.map((product) => (
            <Col key={product._id} xs={6} sm={4} md={3} xxl={2}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer2 />
      <Footer />
    </>
  );
}

export default ProductDetails;
