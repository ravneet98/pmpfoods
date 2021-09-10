import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartAction";

const CartScreen = ({ match, location, history }) => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const discountedPrice = (price, discount) => {
    return addDecimals(price * ((100 - discount) / 100));
  };
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Bag</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Bag is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  {item.discount > 0 ? (
                    <Col md={2}>
                      £{discountedPrice(item.price, item.discount)}{" "}
                      <p
                        style={{
                          fontSize: "0.8rem",
                          textDecorationLine: "line-through",
                          color: "#9E9E9E",
                        }}
                      >
                        £{addDecimals(item.price)}
                      </p>
                    </Col>
                  ) : (
                    <Col md={2}>£{item.price}</Col>
                  )}

                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      style={{ color: "#fff" }}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <h2>
                £
                {cartItems
                  .reduce(
                    (acc, item) =>
                      acc +
                      item.qty * discountedPrice(item.price, item.discount),
                    0
                  )
                  .toFixed(2)}
              </h2>
              <p
                style={{
                  color: "#E53935",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                }}
              >
                Save £
                {cartItems
                  .reduce(
                    (acc, item) =>
                      acc +
                      item.qty * item.price -
                      item.qty * discountedPrice(item.price, item.discount),
                    0
                  )
                  .toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
