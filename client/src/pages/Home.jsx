import { useEffect, useState } from "react";
import { Container, Carousel, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";
import RollingBanner from "../components/RollingBanner";

import { fetchProducts } from "../features/product/productSlice";

import caro1 from "../media/caro.svg";
import adsImg1 from "../media/ads.svg";
import adsImg2 from "../media/ads2.svg";
import discover1 from "../media/discoverImg1.svg";
import discover2 from "../media/discoverImg2.svg";
import discover3 from "../media/discoverImg3.svg";
import discover4 from "../media/airpods.svg";

import iphone from "../media/iphone.svg";
import laptops from "../media/laptops.svg";
import headphones from "../media/headphones.svg";
import miniSpeakers from "../media/miniSpeakers.svg";
import smartTv from "../media/smartTv.svg";
import tripod from "../media/tripod.svg";
import { FaArrowRight, FaBox, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Discover from "../components/Discover";
import Mobile from "../media/iphoneAds.svg";

const caroData = [
  {
    id: 1,
    image: caro1,
    path: "/product",
  },
  {
    id: 2,
    image: caro1,
    path: "/product",
  },
  {
    id: 3,
    image: caro1,
    path: "/product",
  },
];

const sales = [
  {
    id: 1,
    price: "Starting at #29,000 ",
    description: " 3 IN 1 WIRELESS CHARGING STATION ",
  },
  {
    id: 2,
    price: "Starting at #30,000",
    description: " ENTERTAINMENT & GAMES ",
  },
];

const ads = [adsImg1, adsImg2];

const deadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

function Home() {
  const dispatch = useDispatch();
  const { products = [], status } = useSelector((state) => state.product || {});

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(deadline));

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const timer = setInterval(() => {
      const time = getTimeRemaining(deadline);
      setTimeLeft(time);
      if (time.total <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container fluid className="p-0 m-0">
      <div className="adsTop py-1 px-2 text-center">
        Up to 20-40% off your purchase...Same Day Delivery. SIJI CART BRINGS YOU
        ONLY THE BEST DEALS
      </div>
      <Carousel className="hero">
        {caroData.map((caro) => (
          <Carousel.Item interval={300000} key={caro.id}>
            <a href={caro.path}>
              <img src={caro.image} alt={`Carousel Image ${caro.id}`} />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container fluid className="pt-3 px-0">
        <Row className="trendDeals mx-2 gx-2">
          <h4 className="px-0 pt-2 ">Trending Deals</h4>
          <Col xs={6} sm={3} md={3} lg={2}>
            <div className="trendCard text-center mb-3 p-4">
              <a href="/mobile devices/iphone">
                <img src={iphone} alt="iphone" />
                <p className="mt-3 mb-0">iphone</p>
              </a>
            </div>
          </Col>
          <Col xs={6} sm={3} md={3} lg={2}>
            <div className="trendCard text-center mb-3 p-4">
              <a href="/computing devices/laptops">
                <img src={laptops} alt="laptops" />
                <p className="mt-3 mb-0">laptops</p>
              </a>
            </div>
          </Col>
          <Col xs={6} sm={3} md={3} lg={2}>
            <div className="trendCard text-center mb-3 p-4">
              <a href="/mobile accessories">
                <img src={tripod} alt="accessories" />
                <p className="mt-3 mb-0">accessories</p>
              </a>
            </div>
          </Col>
          <Col xs={6} sm={3} md={3} lg={2}>
            <div className="trendCard text-center mb-3 p-4">
              <a href="/audio gadgets/speakers headphones">
                <img src={miniSpeakers} alt="miniSpeakers" />
                <p className="mt-3 mb-0">miniSpeakers</p>
              </a>
            </div>
          </Col>
          <Col xs={6} sm={3} md={2} lg={2} className="d-lg-block d-none">
            <div className="trendCard text-center mb-3 p-4">
              <a href="/smart home/smart accessories">
                <img src={smartTv} alt="smartTv" />
                <p className="mt-3 mb-0">smartTv</p>
              </a>
            </div>
          </Col>
          <Col xs={6} sm={3} md={2} lg={2} className="d-lg-block d-none">
            <div className="trendCard text-center mb-3 p-4">
              <a href="/audio gadgets/speakers headphones">
                <img src={headphones} alt="headphones" />
                <p className="mt-3 mb-0">headphones</p>
              </a>
            </div>
          </Col>
        </Row>
        <div className="d-none d-lg-block">
          <Row className="saleR mx-0 p-5 pb-0">
            {sales.map((sale) => (
              <Col className="rounded sales text-center" key={sale.id}>
                <div className="pDetails text-center">
                  <h5 className="mt-3">{sale.description}</h5>
                  <p>{sale.price}</p>
                  <Button
                    className="shop mb-2"
                    href="/Mobile%20devices/Smartphones/Samsung%20S25%20Ultra"
                  >
                    Shop Now
                  </Button>
                </div>

                <img src={Mobile} alt="gadget" height="300px" />
              </Col>
            ))}
          </Row>
        </div>

        <Row className="mt-5 mx-0 g-1 px-2 productRow">
          <div className="d-flex ldNav">
            <h4 className="px-2">The Latest Drops</h4>
            {/* <Link
              to="#"
              className="d-none d-lg-block"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "black",
              }}
            >
              <h5 className="viwAl mt-2">
                <span className="pr-10">
                  {/* <Link
                    to="/newIn"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    View all
                  </Link> */}
            {/*</span>
                <FaArrowRight size={25} color="#bf5700" />
              </h5>
            </Link> */}
          </div>
          {products.map((product) => (
            <Col xs={6} sm={4} md={3} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <RollingBanner ads={ads[0]} timeLeft={timeLeft} />
      <Container fluid className="p-0 ">
        <div className="d-none d-lg-block">
          <Row className="Bnner mt-5 mx-0">
            <Col xxl={5} xl={5} className="allDetails">
              <div>
                <div className="DMO text-center">
                  <p>Don't miss out!</p>
                </div>
              </div>
              <h1 className="text-center">Up to 30% Discount</h1>
              <h1 className="text-center">Purchase Today! </h1>
              <div className="d-flex time">
                <div className="d-flex flex-column rounded timeCont me-2">
                  <h3>{timeLeft.days}</h3>
                  <p>DAYS</p>
                </div>

                <div className="d-flex flex-column rounded timeCont me-2">
                  <h3>{timeLeft.hours}</h3>
                  <p>HRS</p>
                </div>
                <div className="d-flex flex-column timeCont rounded me-2">
                  <h3>{timeLeft.minutes}</h3>
                  <p>MINS</p>
                </div>
                <div className="d-flex flex-column rounded timeCont me-2">
                  <h3>{timeLeft.seconds}</h3>
                  <p>SEC</p>
                </div>
              </div>
              <Link
                to="#"
                style={{
                  fontWeight: "600",
                  cursor: "pointer",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <h4 className="text-center mt-4">Shop Now</h4>
              </Link>
            </Col>
            <Col xxl={7} xl={7} className="text-center bannerImage">
              <img
                src={Mobile}
                alt="Iphone"
                width="auto"
                height="auto"
                style={{ zIndex: "-2", marginTop: "100px" }}
              />
            </Col>
          </Row>
        </div>

        <div className="coloredNot" style={{ marginTop: "0px" }} />
        <Row className="mt-3 g-1 productRow mx-0 px-2">
          <div className="d-flex ldNav">
            <h4 className="px-2">Best Selling Products</h4>
            {/* <Link
              to="#"
              className="d-none d-lg-block"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "black",
              }}
            >
              <h5 className="viwAl mt-2">
                <span className="pr-10">View all</span>
                <FaArrowRight size={25} color="#bf5700" />
              </h5>
            </Link> */}
          </div>
          {products.map((product) => (
            <Col xs={6} sm={4} md={3} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        <Discover />
        <div className="d-block d-lg-none">
          <Row className="discover mx-2">
            <h4 className="p-0">Discover More</h4>
            <Col xs={6} className="discover1 position-relative p-0">
              <a href="/Camera%20&%20Video%20Equipment/Tripods%20/%20Gimbals">
                <img src={discover1} alt="Discover 1" />
                <span className="position-absolute">tripod</span>
              </a>
            </Col>

            <Col xs={6} className="discover2 p-0">
              <div className="discovered1 position-relative">
                <a href="/smart-tv">
                  <img src={discover2} alt="Discover 2" />
                  <span className="position-absolute">Smart TVs</span>
                </a>
              </div>
              <div className="position-relative">
                <a href="/Computing%20Devices/Laptops">
                  <img src={discover3} alt="Discover 3" />
                  <span className="position-absolute">Laptops</span>
                </a>
              </div>
              <div className="position-relative d-sm-block d-none">
                <a href="/Mobile%20Accessories/Earbuds%20/%20Earphones">
                  <img src={discover4} alt="Discover 3" />
                  <span className="position-absolute">Airpods</span>
                </a>
              </div>
            </Col>
            <div className="coloredNot"></div>
          </Row>
        </div>
        <Row className="mt-3 g-1 productRow mx-0 px-2">
          <div className="d-flex ldNav">
            <h4 className="px-2">Home Appliances</h4>
            {/* <Link
              to="#"
              className="d-none d-lg-block"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "black",
              }}
            >
              <h5 className="viwAl mt-2">
                <span className="pr-10">View all</span>
                <FaArrowRight size={25} color="#bf5700" />
              </h5>
            </Link> */}
          </div>
          {products.map((product) => (
            <Col xs={6} sm={4} md={3} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <div className="d-none d-lg-block">
        <div className=" d-flex flex-column offSale">
          <div className="recommend p-3 ">
            <h5 style={{ float: "left" }}>20% Off Sale</h5>

            <Button style={{ float: "right" }}>Shop Now</Button>
          </div>
          <div className="container mt-5">
            <Row>
              <Col className="p-0">
                <div className="text-center">
                  <img
                    src={iphone}
                    alt="phone"
                    width="215px"
                    height="215px"
                    className="rounded mb-1"
                  />

                  <p>
                    iphone 10 15 charger Type C<br />{" "}
                    <strong style={{ color: "red" }}> #17,200</strong> #25,000
                  </p>
                </div>
              </Col>
              <Col className="p-0">
                <div className="text-center">
                  <img
                    src={iphone}
                    alt="phone"
                    width="215px"
                    height="215px"
                    className="rounded mb-1"
                  />

                  <p>
                    iphone 10 15 charger Type C<br />{" "}
                    <strong style={{ color: "red" }}> #17,200</strong> #25,000
                  </p>
                </div>
              </Col>
              <Col className="p-0">
                <div className="text-center">
                  <img
                    src={iphone}
                    alt="phone"
                    width="215px"
                    height="215px"
                    className="rounded mb-1"
                  />

                  <p>
                    iphone 10 15 charger Type C<br />{" "}
                    <strong style={{ color: "red" }}> #17,200</strong> #25,000
                  </p>
                </div>
              </Col>
              <Col className="p-0">
                <div className="text-center">
                  <img
                    src={iphone}
                    alt="phone"
                    width="215px"
                    height="215px"
                    className="rounded mb-1"
                  />

                  <p>
                    iphone 10 15 charger Type C<br />{" "}
                    <strong style={{ color: "red" }}> #17,200</strong> #25,000
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <p className="text-center" style={{ fontSize: "25px" }}>
            {" "}
            <strong style={{ fontSize: "35px" }}> Recommended For You</strong>
            <br /> 20% Off Sale{" "}
          </p>
          <Link
            to="#"
            style={{
              cursor: "pointer",
              color: "black",
              textDecoration: "none",
              fontWeight: "700",
            }}
            className="text-center "
          >
            <p>Shop Now</p>
          </Link>
        </div>
      </div>
      <div className="coloredNot d-none d-lg-block mt-2" />
      <RollingBanner ads={ads[1]} />
      <div className="coloredNot d-none d-lg-block mt-2" />
      <div className="d-none d-lg-block">
        <Row className="deliver mx-0">
          <Col className="text-center">
            <FaBox size={40} className="mb-3" />
            <h3 style={{ fontWeight: "600" }}>Fast Delivery</h3>
            <p>
              And Free Returns,Sure
              <br />
              Checkout For Delivery Date
            </p>
          </Col>
          <Col className="text-center">
            <FaWhatsapp size={40} className="mb-3" />
            <h3 style={{ fontWeight: "600" }}>Whatsapp</h3>
            <p>
              <a
                href="tel:+2348090600088"
                className="text-decoration-none text-muted"
              >
                +234 809 060 0088
              </a>{" "}
              <br />
              <a
                href="tel:+2348069800261"
                className="text-decoration-none text-muted"
              >
                +234 806 980 0261
              </a>
            </p>
          </Col>
          <Col className="text-center">
            <FaBox size={40} className="mb-3" />
            <h3 style={{ fontWeight: "600" }}>Fast Delivery</h3>
            <p>
              And Free Returns,Sure
              <br />
              Checkout For Delivery Date
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Home;
