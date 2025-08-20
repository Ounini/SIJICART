import { Rating } from "@mui/material";
import { Button, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.images[1];

  const formattedPrice = new Intl.NumberFormat().format(product.price);
  const formattedFormerPrice = product.formerPrice
    ? new Intl.NumberFormat().format(product.formerPrice)
    : null;

  return (
    <Card
      className="productCard"
      style={{ height: "350px", position: "relative", padding: 10 }}
    >
      <div style={{ margin: "0 auto" }}>
        <a href={`/${product.category}/${product.subCategory}/${product.name}`}>
          <Card.Img variant="top" src={productImage} className="productImg" />
          <Card.Body className="p-0">
            <div className="text-center mt-3">
              <Rating
                name="rate-experience"
                defaultValue={product.rating || 0}
                readOnly
              />
            </div>

            <Card.Text className="text-center font-14">
              {product.name}
            </Card.Text>
            <div>
              {product.formerPrice && (
                <p className="text-muted text-center line-through mb-2 -mt-10">
                  ₦{formattedFormerPrice}
                </p>
              )}

              <p className="text-danger text-center font-14 mr-10 priced font-700">
                ₦{formattedPrice}
              </p>
            </div>
          </Card.Body>
        </a>
        <Button
          variant="outline-danger"
          className="d-block toCart px-4"
          onClick={() => addToCart({ ...product, quantity: 1 })}
          style={{
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            position: "absolute",
            width: "90%",
          }}
        >
          Add to cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
