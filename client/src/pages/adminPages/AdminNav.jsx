import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar expand="none" className="bg-body-tertiary mt-5">
      <Container>
        <Navbar.Brand href="/admin">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-nav" />
        <Navbar.Collapse id="admin-nav">
          <Nav className="me-auto text-center">
            <Nav.Link href="/">SijiCart</Nav.Link>
            <Nav.Link href="/admin/manageProducts">Manage Products</Nav.Link>
            <Nav.Link href="/admin/manageOrders">Manage Orders</Nav.Link>
            <Nav.Link href="/admin/users">Users</Nav.Link>
            <Nav.Link
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNav;
