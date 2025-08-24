import { Card, Col, Row } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

const AdminOrderCard = ({ order }) => {
  const { formatPrice } = useCart();

  console.log("Order received in the order card:", order);

  return (
    <Card className="mb-4 shadow-xl rounded-2xl p-4 bg-white">
      <div className="flex justify-between items-center">
        <h3 className="font-18 font-semibold text-gray-800">
          <strong>Order ID: </strong>
          {order._id}
        </h3>
        <p className="text-sm bg-yellow-100 text-yellow-800 rounded-full">
          <strong>Order status:</strong> {order.status}
        </p>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <p>
          <strong>Date Ordered:</strong> {order.createdAt}
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
          <strong>User Address:</strong> {order.address.address},{" "}
          {order.address.city}, {order.address.state}.
        </p>
        <p>
          <strong>User Phone Number:</strong> {order.phone}
        </p>
        <p>
          <strong>User Id:</strong> {order.userId._id}
        </p>
        <p>
          <strong>Order was made by:</strong> {order.userId.name}
        </p>
        <p>
          <strong>User Email Address:</strong> {order.userId.email}
        </p>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-medium">Items</h4>
        {order.products.map((product) => (
          <div key={product._id} className="mt-2 flex gap-3 overflow-x-auto">
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

export default AdminOrderCard;
