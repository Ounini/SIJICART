import { useState } from "react";
import { Row, Col, NavDropdown, Nav } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Badge,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../media/logo.png";

import { FaQuestionCircle, FaRegHeart, FaSearch } from "react-icons/fa";
import { category } from "./category";

const pages = category;

function Navbar() {
  const { userLoggedIn, logout, isAdmin } = useAuth();
  const { cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname || "/";
  // const cart = 5;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null);
  const handleDropdownToggle = (pageTitle) => {
    if (openDropdown === pageTitle) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(pageTitle);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const phoneCategory = pages.find(
    (item) => item.category === "Mobile Devices"
  );
  const phoneCategory2 = pages.find(
    (item) => item.category === "Mobile Accessories"
  );
  const phoneCategory3 = pages.find(
    (item) => item.category === "Computing Devices"
  );
  const phoneCategory4 = pages.find(
    (item) => item.category === "Computer Accessories"
  );
  const phoneCategory5 = pages.find(
    (item) => item.category === "Audio Gadgets"
  );
  const phoneCategory6 = pages.find(
    (item) => item.category === "Camera & Video Equipment"
  );
  const phoneCategory7 = pages.find(
    (item) => item.category === "Gaming Gadgets"
  );
  const phoneCategory8 = pages.find(
    (item) => item.category === "Smart Home Devices"
  );
  const phoneCategory9 = pages.find(
    (item) => item.category === "Car Tech & Accessories"
  );
  const phoneCategory10 = pages.find(
    (item) => item.category === "Display & Projections"
  );
  const phoneCategory11 = pages.find(
    (item) => item.category === "Wearable Tech"
  );
  const phoneCategory12 = pages.find(
    (item) => item.category === "Travel Accessories"
  );

  return (
    <nav className="position-fixed w-100 mt-4 z-1050 naved">
      {/* Work on when doing Laptop version */}
      <div className="subNav">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Row className="d-md-block d-none navRow1 pt-3 gx-0">
              <Col xxl={3} xl={3} md={4} lg={3}>
                <div>
                  <a
                    href="tel:+2348069800261"
                    className="me-1 font-12"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    +234 808 980 0261
                  </a>
                  <span className="upWard mx-1 font-12" />
                  <span className="font-12">{"   "}Store Location</span>
                </div>
              </Col>
              <Col xxl={6} xl={6} md={8} lg={5} className="text-center CTF">
                <p
                  style={{
                    color: "#bf5700",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  Connecting You to The Future. get 20% off your first purchase
                </p>
              </Col>
              <Col xxl={3} xl={3} lg={4} className="CTF">
                <div className="d-flex justify-content-center lsgin">
                  <div className=" p-1 me-3 d-lg-block d-none">
                    <Link
                      to="#"
                      style={{
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      <div className="d-flex ">
                        <FaQuestionCircle className="me-1 " size={15} />
                        HELP
                      </div>
                    </Link>
                  </div>
                  <div className="d-flex p-1  d-lg-block d-none">
                    {userLoggedIn ? (
                      <>
                        {isAdmin && (
                          <>
                            <span className="me-1">
                              <Link
                                to="/admin"
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                                onClick={() => handleCloseUserMenu()}
                              >
                                ADMIN
                              </Link>
                            </span>
                            <span className="me-1">/</span>
                          </>
                        )}
                        <span className="me-2">
                          <Link
                            to="/my-orders"
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                            onClick={() => handleCloseUserMenu()}
                          >
                            MY ORDERS
                          </Link>
                        </span>
                        <span className="me-1">/</span>
                        <span className="me-2">
                          <Link
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                            onClick={() => {
                              handleCloseUserMenu();
                              logout();
                              clearCart();
                            }}
                          >
                            LOG OUT
                          </Link>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="me-1">
                          <Link
                            to="/login"
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            LOGIN
                          </Link>
                        </span>
                        <span className="me-1">/</span>
                        <span className="me-1">
                          <Link
                            to="/signup"
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            SIGN UP
                          </Link>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <hr className="line d-md-block d-none" />
            <Toolbar disableGutters>
              <a href="/">
                <img src={logo} alt="Sijt Logo" className="navLogo" />
              </a>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              />

              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              />

              <Row className="smallNav d-md-block d-none">
                <Col>
                  <Nav>
                    <Link to="/newIn" className="smNavLink">
                      NEW IN
                    </Link>
                  </Nav>
                </Col>
                <Col>
                  <Nav className="electronics">
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title="ELECTRONICS"
                      menuVariant="dark"
                    >
                      <Row className="p-2">
                        <Col xxl={6} className="d-flex mb-5">
                          <div>
                            <div className="itemName">
                              {phoneCategory.category}
                            </div>
                            <hr />
                            {phoneCategory.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <hr />
                          <div>
                            <div className="itemName">
                              {phoneCategory3.category}
                            </div>
                            <hr />
                            {phoneCategory3.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory3.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <hr />
                          <div>
                            <div className="itemName">
                              {phoneCategory6.category}
                            </div>
                            <hr />
                            {phoneCategory6.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory6.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <hr />
                          <div>
                            <div className="itemName">
                              {phoneCategory11.category}
                            </div>
                            <hr />
                            {phoneCategory11.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory11.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <hr />
                          <div>
                            <div className="itemName">
                              {phoneCategory8.category}
                            </div>
                            <hr />
                            {phoneCategory8.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory8.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <hr />
                          <div>
                            <div className="itemName">
                              {phoneCategory10.category}
                            </div>
                            <hr />
                            {phoneCategory10.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory10.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </NavDropdown>
                  </Nav>
                </Col>
                <Col>
                  <Nav className="gadget">
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title="GADJETS"
                      menuVariant="dark"
                    >
                      <Row className="p-2">
                        <Col xxl={6} className="d-flex mb-5">
                          <div>
                            <div className="itemName">
                              {phoneCategory5.category}
                            </div>
                            <hr />
                            {phoneCategory5.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory5.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <div>
                            <div className="itemName">
                              {phoneCategory7.category}
                            </div>
                            <hr />
                            {phoneCategory7.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory7.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </NavDropdown>
                  </Nav>
                </Col>
                <Col>
                  <Nav>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title="ACCESSORIES"
                      menuVariant="dark"
                    >
                      <Row className="p-2">
                        <Col xxl={6} className="d-flex mb-5">
                          <div>
                            <div className="itemName">
                              {phoneCategory2.category}
                            </div>
                            <hr />
                            {phoneCategory2.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory2.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <div>
                            <div className="itemName">
                              {phoneCategory4.category}
                            </div>
                            <hr />
                            {phoneCategory4.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory4.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <div>
                            <div className="itemName">
                              {phoneCategory9.category}
                            </div>
                            <hr />
                            {phoneCategory9.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory9.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                          <div>
                            <div className="itemName">
                              {phoneCategory12.category}
                            </div>
                            <hr />
                            {phoneCategory12.subCategory.map((sub, index) => (
                              <NavDropdown.Item
                                href={`/${phoneCategory12.category}/${sub}`}
                                key={index}
                              >
                                {sub}
                              </NavDropdown.Item>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </NavDropdown>
                  </Nav>
                </Col>
              </Row>

              {/* End of added code */}

              <Box sx={{ flexGrow: 0 }} className="d-lg-none d-block">
                <Tooltip title="Open Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <i className="bi bi-person iconed profile" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userLoggedIn ? (
                    <div>
                      {isAdmin && (
                        <MenuItem
                          onClick={() => {
                            handleCloseUserMenu();
                            navigate("/admin");
                          }}
                        >
                          <Typography sx={{ textAlign: "center" }}>
                            Admin
                          </Typography>
                        </MenuItem>
                      )}

                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu();
                          navigate("/my-orders");
                        }}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          My Orders
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu();
                          logout();
                          clearCart();
                        }}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          Logout
                        </Typography>
                      </MenuItem>
                    </div>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/login", from);
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        Login
                      </Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
              <Box
                sx={{ flexGrow: 0 }}
                className="mx-2"
                onClick={() => navigate("/cart")}
              >
                <IconButton sx={{ p: 0 }}>
                  <Badge
                    badgeContent={cartCount}
                    color="error"
                    // className="badge"
                  >
                    <i className="bi bi-cart iconed" />
                  </Badge>
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <Box
                      key={page.category}
                      sx={{ position: "relative", display: "inline-block" }}
                    >
                      <Button
                        onClick={() => handleDropdownToggle(page.category)}
                        sx={{ my: 0.5, color: "black", display: "block" }}
                      >
                        {page.category}
                        <span className=" upWard arrow" />
                      </Button>
                      {page.subCategory && openDropdown === page.category && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            bgcolor: "background.paper",
                            boxShadow: 3,
                            borderRadius: 1,
                            minWidth: 150,
                            zIndex: 1,
                          }}
                        >
                          {page.subCategory.map((sub) => (
                            <MenuItem
                              key={sub}
                              onClick={() => {
                                navigate(`/${page.category}/${sub}`);
                                setOpenDropdown(null); // close after clicking
                              }}
                            >
                              {sub}
                            </MenuItem>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </nav>
  );
}

export default Navbar;
