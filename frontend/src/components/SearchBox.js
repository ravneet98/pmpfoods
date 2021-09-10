import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      inline
      className='d-flex'
      
    >
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='me-sm ms-sm-5'
        style={{ color: "#fff" }}
      ></Form.Control>
      <Button
        type='submit'
        className='btn btn-primary my-2 my-sm-0'
        
      >
        <i className='fas fa-search'></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
