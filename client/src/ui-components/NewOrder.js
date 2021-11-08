import { Button, Alert, Form, Row, Col , Dropdown, DropdownButton} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

function NewOrder(props) {

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

  const handleSubmit = (event,props) => {

    //fare controllo che email sia presente nel db e invocare API che fa ordine
    let foundUser = false;
    //console.log(mail);
    for (let user of users){
      if (user.email === mailInserted) foundUser = true;
    }
    if (foundUser === false) setErrorMessage("User not registered");
    else{
    console.log(orderProduct)
    props.addMessage("Request sent correctly!")

    //API.insertOrder(orderProducts,mail)
    props.changeAction(0);
    }
  }


  const [errorMessage,setErrorMessage] = useState('')
  const [products, setProducts] = useState([
    { id: 1, quantity: 2, price: 20.5, name: "test" },
    { id: 2, quantity: 3, price: 20.5, name: "test" },
    { id: 3, quantity: 1, price: 20.5, name: "test" },
  ]);
  
  const [orderProduct, setOrderProducts] = useState([{idProduct : 1 , quantity : 0 },{idProduct : 2 , quantity : 0 },{idProduct : 3 , quantity : 0 }]);
  const [users,setUsers] = useState([{email:"user1"},{email:"user2"}])
  const [mailInserted,setMailInserted] = useState(undefined)

  

  return (
    <> 
    {errorMessage ? <Alert variant='danger' onClose={() => setErrorMessage('')} dismissible> {errorMessage} </Alert> : ""}
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Client mail</Form.Label>
      <Form.Control type="email" onChange={(ev) => {setMailInserted(ev.target.value)}} />
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
