import { Button, Alert, Form, Row, Col , Dropdown, DropdownButton} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

function NewOrder(props) {

  const handleSubmit = (event,props) => {

    //fare controllo che email sia presente nel db e invocare API che fa ordine 
    //console.log(orderProduct)
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Client mail</Form.Label>
      <Form.Control type="email"  />
    </Form.Group>
      {products.map((p) => (
        <Row>
        {p.id}{" "}
        {p.name}{" "}
        {p.price}{" "}
        <Col>
        <DropdownButton id="dropdown-basic-button" title="Select Quantity">
         {[...Array(p.quantity+1).keys()].map( (i) => <Dropdown.Item   onClick={ () => {
           setOrderProducts(old => {
             const list = old.map( (item) => {
               if (item.idProduct === p.id) return {idProduct : p.id , quantity : i}
               else return item;

              });
              return list;
           })
           console.log(i)

         }}>{i}</Dropdown.Item> )}
          </DropdownButton>
         </Col>
        


        
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
