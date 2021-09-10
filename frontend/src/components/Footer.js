import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer class='bg-primary' >
      <Container>
        <Row>
          <Col className='text-center py-5'>Copyright &copy; PMP Foods LTD</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
