import { Button, Card, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function CartCard({ product }) {
  const {
    formatPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateColor,
  } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.selectedColor || product.colors?.[0]
  );

  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.images[1];

  const productColors = product.colors;

  return (
    <Card
      style={{ width: "100%" }}
      className="cartCard position-relative d-flex align-items-center"
    >
      <Card.Img className="cartImg" src={productImage} />
      <Card.Body>
        <Card.Title className="font-16 font-600">{product.name}</Card.Title>
        <Card.Text className="font-14">
          <span>{formatPrice(product.price)}</span>{" "}
          {product.formerPrice && (
            <span className="text-muted line-through">
              {formatPrice(product.formerPrice)}
            </span>
          )}
        </Card.Text>
        {productColors && (
          <div className="d-flex align-items-center gap-2 mt-2">
            <Form.Select
              value={selectedColor}
              onChange={(e) => {
                const color = e.target.value;
                updateColor(product._id, color);
                setSelectedColor(color);
              }}
              style={{ maxWidth: "120px" }}
            >
              {productColors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </Form.Select>
            <div
              title={`Selected color: ${selectedColor}`}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: selectedColor,
                border: "1px solid #ddd",
                boxShadow: "0 0 3px rgba(0,0,0,0.3)",
              }}
            />
          </div>
        )}

        <div className="d-flex align-items-center gap-2 mt-2">
          <p className="my-auto">Quantity</p>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => decreaseQuantity(product._id)}
          >
            –
          </Button>
          <span className="font-14">{product.quantity}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => increaseQuantity(product._id)}
          >
            +
          </Button>
        </div>

        <span
          className="position-absolute top-0 right-0 mx-3 my-3"
          onClick={() => removeFromCart(product._id)}
        >
          <i className="bi bi-trash font-20" />
        </span>
      </Card.Body>
    </Card>
  );
}

export default CartCard;
