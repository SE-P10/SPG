import React from "react";
import { useState } from "react";
import { Form, Row } from "react-bootstrap";

import "../css/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { searchIcon } from "./Icons";

function SearchForm(props) {
  const [value, setValue] = useState("");

  const onValueChange = (event) => {
    const newVal = event.target.value;

    // We don't want a description made by only spaces
    if (newVal.trim() === "") {
      setValue("");
      props.setSearchValue("");
      return;
    }

    props.setSearchValue(newVal);
    setValue(newVal);
    props.onSearchSubmit();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSearchSubmit();
  };

  return (
    <>
      <Form className='mb-2 mx-3' onSubmit={onSubmit}>
        <Row>
          {searchIcon}
          <Form.Group className='mb-0 ml-1' controlId='search'>
            <Form.Control
              className='fw-300'
              type='search'
              placeholder='Search'
              aria-label='Search for a product!'
              value={value}
              onChange={onValueChange}
            />
          </Form.Group>
        </Row>
      </Form>
    </>
  );
}

export default SearchForm;
