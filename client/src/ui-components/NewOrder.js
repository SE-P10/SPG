import { Button, Alert, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

function NewOrder(props) {

  const handleSubmit = (event,props) => {


    console.log("ciao")
    props.changeAction(0);

  }



  const [products, setProducts] = useState([
    { id: 1, quantity: 2, price: 20.5, name: "test" },
    { id: 2, quantity: 2, price: 20.5, name: "test" },
    { id: 3, quantity: 2, price: 20.5, name: "test" },
  ]);
  
  const [orderProduct, setOrderProducts] = useState([{idProduct : 1 , quantity : 0 },{idProduct : 2 , quantity : 0 },{idProduct : 3 , quantity : 0 }]);
  const [users,setUsers] = useState({email:"user1"},{email:"user2"})

  useEffect(() => {
    const fillTables = async () => {
      //const productsTmp = await API.getProducts();
      //const userTmp = await API.getUsers();
      //setProducts(productsTmp);
      //setUsers(usersTmp);
      //for (let p of productsTmp ){
      //  setOrderProducts(oldList => {return oldList.concat({idProduct : p.id,quantity : 0})})
      //}
      
    };

    fillTables();
  }, []);
  //return <> NewOrder </>;

  return (
    <> <Form>
      {products.map((p) => (
        <Row>
        {p.id}{" "}
        {p.name}{" "}
        {p.price}{" "} 
        <Col><Form.Check   /></Col>

        
        </Row>

        

      ))}

<Button
                className='se-button btn-block'
                onClick={(ev) => handleSubmit(ev,props)}>
                Register a Client
          </Button>
      </Form>
    </>
  );
}

export { NewOrder };
