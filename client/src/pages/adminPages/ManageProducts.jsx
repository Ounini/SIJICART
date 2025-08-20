import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../../features/product/productSlice";
import AdminNav from "./AdminNav";

function ManageProducts() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);
  const [searchItem, setSearchItem] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(selectedProductId));
    setShowModal(false);
    setSelectedProductId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  if (error) {
    return <h3>Error loading products: {error}</h3>;
  }

  const filteredItems = searchItem
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    : products;

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
        <h1>Manage Products</h1>
        <span className="position-absolute top-0 right-0">
          <a href="/admin/manageProducts/addProduct">
            <i className="bi bi-plus text-black" />
          </a>
        </span>
      </div>
      <Row>
        {filteredItems.map((filtered) => (
          <Col xl={4} md={6} sm={12} key={filtered._id}>
            <div className="adminProduct text-center m-2">
              {filtered.name}
              <div>
                <a href={`/admin/manageProducts/editProduct/${filtered._id}`}>
                  <Button variant="success">Edit</Button>
                </a>

                <a
                  className="px-5"
                  href={`/admin/manageProducts/details/${filtered._id}`}
                >
                  <Button variant="info">Details</Button>
                </a>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(filtered._id)}
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

export default ManageProducts;
