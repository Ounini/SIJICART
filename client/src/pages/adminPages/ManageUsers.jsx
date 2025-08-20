import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import AdminNav from "./AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { deleteUser, getUsers } from "../../features/user/userSlice";

function ManageUsers() {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.user);
  const [searchItem, setSearchItem] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDeleteClick = (userId) => {
    setSelectedOrder(userId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(selectedOrder));
    setShowModal(false);
    setSelectedOrder(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (error) {
    return <h3>Error loading users: {error}</h3>;
  }

  const filteredItems = searchItem
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    : users;

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
        <h1>Users</h1>
      </div>

      <Row>
        {filteredItems.map((user) => (
          <Col xl={4} md={6} sm={12} key={user._id}>
            <div className="adminProduct text-center m-2">
              <p className="text-center">{user.name}</p>
              <div>
                <a href={`/admin/users/editUser/${user._id}`}>
                  <Button variant="success">Edit</Button>
                </a>

                <a className="px-5" href={`/admin/users/details/${user._id}`}>
                  <Button variant="info">Details</Button>
                </a>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(user._id)}
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

export default ManageUsers;
