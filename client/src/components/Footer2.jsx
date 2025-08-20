import { Col, Container, Row } from "react-bootstrap";
import logo from "../media/logo1.jpg";
import payment from "../media/payment.svg";

const footerData = [
  {
    id: 1,
    title: "Contact Us",
    links: [
      {
        id: 1,
        name: "SijiCart",
      },
      {
        id: 2,
        name: "+234 809 060 0088",
        path: "tel:+2348090600088",
      },
      {
        id: 3,
        name: "+234 806 980 0261",
        path: "tel:+2348069800261",
      },
      {
        id: 4,
        name: "contact@sijicart.com",
        path: "mailto:contact@sijicart.com",
      },
    ],
  },
  {
    id: 2,
    title: "Information",
    links: [
      {
        id: 1,
        name: "Privacy Policy",
        path: "/privacy-policy",
      },
      {
        id: 2,
        name: "Return Policy",
        path: "/return-policy",
      },
      {
        id: 3,
        name: "Delivery Policy",
        path: "/delivery-policy",
      },
    ],
  },
  {
    id: 3,
    title: "Help",
    links: [
      {
        id: 1,
        name: "FAQ",
        path: "/faq",
      },
    ],
  },
  {
    id: 4,
    title: "Payment",
    links: [
      {
        id: 1,
        name: "Verve",
        path: "/payment",
      },
      {
        id: 2,
        name: "Mastercard",
        path: "/payment",
      },
      {
        id: 3,
        name: "Visa",
        path: "/payment",
      },
      {
        id: 4,
        name: "Bank transfer",
        path: "direct-transfer",
      },
    ],
  },
];

const socials = [
  {
    id: 1,
    path: "https://www.x.com/",
    icon: "bi bi-twitter-x",
  },
  {
    id: 2,
    path: "https://www.facebook.com/",
    icon: "bi bi-facebook",
  },
  {
    id: 3,
    path: "https://www.instagram.com/",
    icon: "bi bi-instagram",
  },
  {
    id: 4,
    path: "mailto:contact@sijicart.com",
    icon: "bi bi-envelope",
  },
];

const Footer2 = () => {
  const year = new Date().getFullYear();

  return (
    <Container
      fluid
      className="footer2 footer text-white d-none px-0 d-lg-block"
    >
      <Row className="mx-0">
        <Col lg={7} className="p-4">
          <Row>
            {footerData.map((item) => (
              <Col key={item.id} className="my-2">
                <h5>
                  <strong>{item.title}</strong>
                </h5>
                {item.links.map((link) => (
                  <a
                    href={link.path}
                    key={link.id}
                    className="text-white text-decoration-none"
                  >
                    <p>{link.name}</p>
                  </a>
                ))}
              </Col>
            ))}
          </Row>
        </Col>
        <Col
          lg={5}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h5 className="font-18">Connect With US</h5>
          <div>
            {socials.map((social) => (
              <a target="_blank" href={social.path} key={social.id}>
                <i style={{ fontSize: "35px" }} className={social.icon} />
              </a>
            ))}
          </div>
        </Col>
      </Row>
      <div
        style={{ backgroundColor: "#484848", justifyContent: "space-between" }}
        className="py-2 px-3 d-flex align-items-center "
      >
        <div>
          <img
            src={logo}
            alt="logo"
            width="auto"
            height="50px"
            style={{ marginRight: "30px" }}
          />
          Copyright <span>&copy;{year} </span> SijiCart.Com. All Rights Reserved
        </div>

        <div>
          <img src={payment} alt="Payment" />
        </div>
      </div>
    </Container>
  );
};

export default Footer2;
