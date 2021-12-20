import { useState, React } from "react";
<<<<<<< HEAD
import { Form, Row } from "react-bootstrap";

import "../css/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
=======
import { Form } from "react-bootstrap";
>>>>>>> origin/improvments--adjust-graphic
import { searchIcon } from "./Icons";
import { SVGIcon } from "../ui-components/Page";

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
    <Form className='mb-2 mx-3' onSubmit={onSubmit}>
      <div className="im-search">
        <SVGIcon icon={searchIcon} width='22px' height='22px' style={{ margin: '10px 0 10px 20px' }} />
        <input
          className='im-search_input'
          controlId='search'
          type='search'
          placeholder='Search'
          aria-label='Search for a product!'
          value={value}
          onChange={onValueChange}
          autoComplete="off"
        />
      </div>
    </Form>
  );
}

export default SearchForm;
