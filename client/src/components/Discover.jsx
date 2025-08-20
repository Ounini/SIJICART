import { Container, Row, Col } from "react-bootstrap";

import discover1 from "../media/discoverImg1.svg";
import discover2 from "../media/discoverImg2.svg";
import discover3 from "../media/discoverImg3.svg";
import discover4 from "../media/discoverImg4.svg";
import discover5 from "../media/airpods.svg";

function Discover() {
  return (
    <Container fluid className="p-0 d-none d-lg-block">
      <Row className="discover-section px-2 mx-0">
        <h4 className="section-title">Discover More</h4>

        <Col md={4} className="discover-left mb-3 mb-md-0">
          <a href="/cameras/tripod" className="image-card">
            <img src={discover1} alt="Tripods" />
            <span>Tripods</span>
          </a>
        </Col>

        <Col md={8} className="discover-right">
          <Row className="g-2">
            <Col md={7}>
              <a href="/smart-tv" className="image-card">
                <img src={discover2} alt="Smart TVs" />
                <span>Smart TVs</span>
              </a>
            </Col>
            <Col md={5}>
              <a href="/laptops" className="image-card">
                <img src={discover3} alt="Laptops" />
                <span>Laptops</span>
              </a>
            </Col>
            <Col md={5}>
              <a href="/cameras" className="image-card">
                <img src={discover4} alt="Cameras" />
                <span>Cameras</span>
              </a>
            </Col>
            <Col md={7}>
              <a href="/airpods" className="image-card">
                <img src={discover5} alt="Airpods" />
                <span>Airpods</span>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="coloredNot d-none d-lg-block -mt-35" />
    </Container>
  );
}

export default Discover;
