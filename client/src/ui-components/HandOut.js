import { useState } from "react";
import { Container, Row, Alert, Col, Button } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { useEffect } from "react";


function HandOut(props) {
  const [orders,setOrders] = useState([{id:1,status:"NotHandOut",price:3,date:"01-01-2021"},{id:2,status:"HandOut",price:3,date:"01-01-2021"},{id:3,status:"NotHandOut",price:3,date:"01-01-2021"},{id:4,status:"NotHandOut",price:3,date:"01-01-2021"}]);
  const [idUser,setIdUsers] = useState(-1);
  const [errorMessage,setErrorMessage] = useState('');

  const handOutOrder = (orderId) => {

    console.log(orderId);
    //API.handOutOrder(orderId)
    props.addMessage("Order hands out correctly!")

    props.changeAction(0);

  } 

  const handleSearch = (email) => {
    
    // order Id = API GetOrdersByEmail(email)
    //setIdUsers(Id);
    if (idUser === -1){
      setErrorMessage("user not found");
    }
    else {
      //let ordersTmp = API.getOrdersById(idUser)
      //setOrders(ordersTmp)

    }
  };

  

  return (
    <Container>

      <Row className='justify-content-center'>
        {" "}
        <h2> Hand out an Order</h2>{" "}
      </Row>
      {errorMessage ? <Alert variant='danger' onClose={() => setErrorMessage('')} dismissible> {errorMessage} </Alert> : ""}
      <Row>
        {" "}
        <SearchComponent className='mx-auto' handleSearch={handleSearch} />{" "}
      </Row>

      <Col>
      {orders.filter(t=> t.status==="NotHandOut").map((order) => (
        <Row>
          <Col> id : {order.id}
          </Col>
          <Col> date : {order.date}
          </Col><Col>price :  {order.price}
          </Col>
          <Col>
            <Button onClick={()=> {handOutOrder(order.id)}}> hand out </Button> 
          </Col>
        </Row>
      ))}
      </Col>


    </Container>
  );
}
export { HandOut };
