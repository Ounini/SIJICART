import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import AdminNav from "./AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteOrder, fetchAllOrders } from "../../features/order/orderSlice";
import { useState } from "react";

function ManageOrders() {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const [searchItem, setSearchItem] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, status]);

  const handleDeleteClick = (orderId) => {
    setSelectedOrder(orderId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteOrder(selectedOrder));
    setShowModal(false);
    setSelectedOrder(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (error) {
    return <h3>Error loading orders: {error}</h3>;
  }

  const filteredItems = searchItem
    ? orders.filter((order) => {
        const lowerSearch = searchItem.toLowerCase();
        return order._id?.toLowerCase().includes(lowerSearch);
      })
    : orders;

  return (
    <Container fluid>
      <AdminNav />
      <Form className="mt-3 mb-4 ">
        <Form.Group className="mb-3">
          <Form.Control
            id="adminSearch"
            className="adminSearch ml-a mr-a"
            type="text"
            placeholder="Search"
            value={searchItem}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
        </Form.Group>
      </Form>

      <div className="position-relative manageHeader my-2">
        <h1>Manage Orders</h1>
        {/* <span className="position-absolute top-0 right-0">
          <a href="/admin/manageOrders/addOrder">
            <i className="bi bi-plus text-black" />
          </a>
        </span> */}
      </div>

      <Row>
        {filteredItems.map((order) => (
          <Col xl={4} md={6} sm={12} key={order._id}>
            <div className="adminProduct text-center m-2 p-2">
              <p className="text-start">
                {order.name} {order._id}
              </p>
              <div>
                <a href={`/admin/manageOrders/editOrder/${order._id}`}>
                  <Button variant="success">Edit</Button>
                </a>

                <a
                  className="px-5"
                  href={`/admin/manageOrders/details/${order._id}`}
                >
                  <Button variant="info">Details</Button>
                </a>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(order._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Confirm Delete Modal */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageOrders;
