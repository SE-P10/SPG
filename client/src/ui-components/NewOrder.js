import { Button, Alert, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

function NewOrder(props) {
  const [products, setProducts] = useState([
    { id: 1, quantity: 2, price: 20.5, name: "test" },
    { id: 1, quantity: 2, price: 20.5, name: "test" },
    { id: 1, quantity: 2, price: 20.5, name: "test" },
  ]);
  const [orderProduct, setOrderProducts] = useState([]);
  useEffect(() => {
    const fillTables = async () => {
      //const productsTmp = await API.getProducts();
      //setProducts(productsTmp);
    };

    fillTables();
  }, []);
  //return <> NewOrder </>;

  return (
    <>
      {products.map((p) => (
        <>{p.id}</>
      ))}
    </>
  );
}

export { NewOrder };
