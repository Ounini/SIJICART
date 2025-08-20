import { Button, Container, Form, Toast } from "react-bootstrap";
import AdminNav from "./AdminNav";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../features/user/userSlice";

function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [toastText, setToastText] = useState("");

  const [updatedUser, setUpdatedUser] = useState({
    phone: "",
    isAdmin: false,
  });

  console.log(currentUser);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser) {
      setUpdatedUser({
        phone: currentUser?.phone || "",
        isAdmin: currentUser?.isAdmin || false,
        email: currentUser?.email || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(updateUser({ id, updatedUser }));
      setShowToast(true);
      setToastBg("success");
      setToastText("User Updated");
    } catch (err) {
      console.error("Error: ", err);
      setShowToast(true);
      setToastBg("danger");
      setToastText("Something went wrong");
    }
  };

  return (
    <Container fluid>
      <AdminNav />
      <Link to={-1} className="back">
        <i className="bi bi-arrow-left" />
      </Link>
      <h1>Edit User</h1>
      <h5 className="text-center my-5">{currentUser.name}</h5>
      <Form className="px-2 editProduct shapeForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">User Phone Number</Form.Label>
          <Form.Control
            name="phone"
            type="text"
            placeholder={currentUser.phone}
            value={updatedUser.phone || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">User Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder={currentUser.email}
            value={updatedUser.email || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="isAdmin">Admin Status</Form.Label>
          <Form.Select
            name="isPaid"
            value={updatedUser.isAdmin || ""}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, isAdmin: e.target.value })
            }
          >
            <option value={currentUser.isAdmin}>
              {currentUser.isAdmin === false ? "Not Admin" : "Admin"}
            </option>
            {currentUser.isAdmin === true && (
              <option value={false}>Not Admin</option>
            )}
            {currentUser.isAdmin === false && (
              <option value={true}>Admin</option>
            )}
          </Form.Select>
        </Form.Group>

        <Button className="mb-10" type="submit">
          Update User
        </Button>
      </Form>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-absolute top-0 end-0 p-3 mt-5"
        bg={toastBg}
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">{toastText} </Toast.Body>
      </Toast>
    </Container>
  );
}

export default EditUser;
