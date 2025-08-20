import { Card, Col, Row } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const OrderCard = ({ order }) => {
  const { formatPrice } = useCart();

  return (
    <Card className="mb-4 shadow-xl rounded-2xl p-4 bg-white orderCard mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="font-18 font-semibold text-gray-800">
          <strong>Order ID: </strong>
          {order._id}
        </h3>
        <p>
          <strong>Your order status:</strong> {order.status}
        </p>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <p>
          <strong>Date Ordered:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}{" "}
          {new Date(order.createdAt).toLocaleTimeString()}
        </p>
        <p>
          <strong>Total:</strong> {formatPrice(order.amount)}
        </p>
        <p>
          <strong>Payment Status:</strong> {order.isPaid ? "Paid" : "Not Paid"}
        </p>
        <p>
          <strong>Payment:</strong> {order.paymentMethod}
        </p>
        {order.paymentId && (
          <p>
            <strong>Payment ID:</strong> {order.paymentId}
          </p>
        )}
        <p>
          <strong>Address:</strong> {order.address.address},{" "}
          {order.address.city}, {order.address.state}.
        </p>
        <p>
          <strong>Contact:</strong> {order.phone}
        </p>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-medium">Items</h4>
        {order.products.map((product) => (
          <div className="mt-2 flex gap-3 overflow-x-auto">
            <div className="flex-shrink-0 border rounded-lg p-2 w-[120px] bg-gray-50">
              <p className="text-xs mt-1">
                Product Name: {product.productName}
              </p>
              <Row>
                <Col>
                  <p className="text-xs">Color: {product.color}</p>
                </Col>

                <Col>
                  <p className="text-xs text-gray-500">
                    Qty: {product.quantity}
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OrderCard;
