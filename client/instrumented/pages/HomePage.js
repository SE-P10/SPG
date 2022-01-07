import { Container, Carousel, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Page } from "../ui-components/Page";

function HomePage(props) {
  
  return (

    <Page>
      <Container className='justify-content-center fluid big-screen'>
        <Row className='below justify-content-center'>
          <Col className='justify-content-center' xs={7}>
            <Carousel lassName='below'>
              <Carousel.Item>
                <img
                  className='d-block w-100 '
                  src={process.env.PUBLIC_URL + "/images/carousel1.jpg"}
                  alt='First slide'
                />
                <Carousel.Caption className="carousel-text">
                  <h1>SOLIDARITY</h1>
                  <p>A common shared interest</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src={process.env.PUBLIC_URL + "/images/carousel2.jpg"}
                  alt='Second slide'
                />

                <Carousel.Caption className="carousel-text">
                  <h1>SUSTAINABILITY</h1>
                  <p >
                    Meeting our own needs without compromising the ability of
                    future generations to meet their own needs.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src={process.env.PUBLIC_URL + "/images/carousel3.jpg"}
                  alt='Third slide'
                />

                <Carousel.Caption className="carousel-text">
                  <h1>EQUITY</h1>
                  
                  <p>
                    The fair treatment, access, opportunity, and advancement
                    for all people.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>

      <Container className='small-screen'>
        <Row className='below'>
          <h1>Solidarity</h1>
          <p>A common shared interest</p>

          <img
            className='d-block w-100 '
            src={process.env.PUBLIC_URL + "/images/carousel1.jpg"}
            alt='First slide'
          />
        </Row>
        <Row className='below'>
          <h1>Sustanaibility</h1>
          <p>
            {" "}
            Meeting our own needs without compromising the ability of future
            generations to meet their own needs.
          </p>
          <img
            className='d-block w-100'
            src={process.env.PUBLIC_URL + "/images/carousel2.jpg"}
            alt='Second slide'
          />
        </Row>
        <Row className='below'>
          <h1>Equity</h1>
          <p>
            The fair treatment, access, opportunity, and advancement for all
            people.
          </p>
          <img
            className='d-block w-100'
            src={process.env.PUBLIC_URL + "/images/carousel3.jpg"}
            alt='Third slide'
          />
        </Row>
      </Container>

      <Col className='d-flex justify-content-evenly below over'>
        <Link to={"/about"} className="">
          <Button className='im-button im-animate'>
            About us
          </Button>
        </Link>
        <Link to={"/products"} >
          <Button className='im-button im-animate'>
            Our Products
          </Button>
        </Link>
      </Col>
    </Page>

  );
}

export { HomePage };
