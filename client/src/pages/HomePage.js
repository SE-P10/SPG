import { Container, Carousel, Row, Col, Button } from "react-bootstrap";
import "../css/custom.css";
import { Link } from "react-router-dom";

function HomePage(props) {


  return (
    <>
      <Container>
        <Container className='justify-content-center fluid big-screen'>
          <Row className='below justify-content-center'>
            <Col className='justify-content-center' xs={9}>
              <Carousel lassName='below'>
                <Carousel.Item>
                  <img
                    className='d-block w-100 '
                    src={process.env.PUBLIC_URL + "/images/carousel1.jpg"}
                    alt='First slide'
                  />
                  <Carousel.Caption>
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

                  <Carousel.Caption>
                    <h1>SUSTAINABILITY</h1>
                    <p>
                      {" "}
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

                  <Carousel.Caption className='text-black'>
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
            <h1>Solidariety</h1>
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
        <Row className='justify-content-center below'>
          <Link to={"/about"} >
            <Button className='spg-button mr-1'>
              About us
            </Button>
          </Link>
          <Link to={"/products"} >
            <Button className='spg-button'>
              Our Products
            </Button>
          </Link>
        </Row>
      </Container>
    </>
  );
}

export { HomePage };
