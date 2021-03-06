import { Container, Row, Image, Col } from "react-bootstrap";
import { Page} from "../ui-components/Page";

function AboutPage(props) {
  return (
    <Page>
      
      <Container className='text-dark below'>
        <Col>
          <Row className='justify-content-left '>
            <h1 className='font-about-us-title'>What is SPG?</h1>
          </Row>
          <Row>
            <p className='font-about-us'>
              Solidarity Purchasing Group, known as GAS in Italy, comprises of
              group of people who decide to meet the nutritional and
              consumptional requirements. The reasons for entrepreneurs to form
              into groups may vary. Economy is the most obvious stimulus: I
              interconnect with other consumers and I buy in bulks - therefore I
              save money; I am able to purchase goods which, for some reason,
              are unavailable in smaller quantities. Other reasons may be purely
              idealistic: we want to belong to a group, take part in meetings,
              exchange experiences and live in community spirit. However, that’s
              not all. Apart from what has already been said, our every purchase
              contributes to development of a particular production, economical
              and social model.
            </p>
            <Image style={{ width: '40rem' }}
              className='mx-auto below ph-au-f'
              src='./images/about1.jpeg'
            />
            <Image  style={{ width: '40rem' }}
              className='mx-auto below ph-au-f'
              src='./images/about2.jpeg'
            />
          </Row>

          <Row className='justify-content-left below'>
            <h1 className='font-about-us-title'>How is it born?</h1>
          </Row>
          <Row>
            <p className='font-about-us'>
              The idea comes from the critical and constructive thinking of 7
              young talents who, by joining their efforts, have given life to a
              great social work in turin. The hard work of these guys has
              allowed us to set up an efficient and functioning SPG that first
              of all puts communication between customers and producers through
              a simple, intuitive mean of communication within everyone's reach.
              Andrea, Alessandro and Gabriele used their knowledge and
              logistical skills to put farmers and clients in contact with a
              complex and fast communication system. Desirè, Amedeo and Armando
              have implemented their marketing and service management skills to
              meet the needs and requirements of each customer. Despite
              everything, quality is not left behind and, in fact, the control
              of each product is entrusted to the sector expert Michele. Unity
              is strength and these young guys are proof of that.
            </p>
            <Image   src='./images/team.jpg' className='ph-au' />
          </Row>
        </Col>
      </Container>
    </Page>
  );
}

export { AboutPage };
