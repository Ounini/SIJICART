import { Accordion, Container, FormText } from "react-bootstrap";
import logo from "../media/logo1.jpg";

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
        path: "/policy",
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

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Container
      fluid
      className="p-3 footer text-white text-center d-block d-lg-none"
    >
      <h5 className="font-14">Connect With US</h5>
      <div>
        {socials.map((social) => (
          <a target="_blank" href={social.path} key={social.id}>
            <i className={social.icon} />
          </a>
        ))}
      </div>

      <Accordion>
        {footerData.map((footer) => (
          <Accordion.Item eventKey={footer.id} key={footer.id}>
            <Accordion.Header>{footer.title}</Accordion.Header>
            <Accordion.Body>
              {footer.links.map((link) => (
                <a href={link.path} key={link.id}>
                  <p>{link.name}</p>
                </a>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <hr />
      <div>
        <img src={logo} alt="logo" width={"auto"} height={30} />
        <span className="ml-10">&copy;{year} </span> SijiCart.Com. All Rights
        Reserved
      </div>
    </Container>
  );
};

export default Footer;
