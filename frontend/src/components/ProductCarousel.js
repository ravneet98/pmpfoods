import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import Discount from './Discount';
import { listTopProducts } from '../actions/productActions'



const ProductCarousel = () => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const discountedPrice = (price, discount) => {
    return addDecimals(price * ((100 - discount) / 100));
  };
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      className='bg-light rounded shadow'
      variant='light'
      controls='true'
      indicators='true'
      touch='true'
      style={{ height: 500, marginBottom: 50 }}
    >
      {products.map((p) => {
        return (
          <Carousel.Item style={{ width: "100%", height: "100%" }}>
            {p.discount > 0 ? <Discount discount={`-${p.discount}%`} /> : ""}
            <Link to={`/product/${p._id}`}>
              <Row className='justify-content-md-center'>
                <Col xs={12} sm={4} md={4}>
                  <img
                    className='d-block w-100'
                    src={p.image}
                    alt={p.name}
                    style={{
                      objectFit: "cover",
                      maxheight: 450,
                      maxWidth: 450,
                    }}
                  />
                </Col>
              </Row>
              <Row>
                {
                  <Col xs={12} sm={4} md={4}>
                    <Carousel.Caption>
                      <div>
                        <h1
                        >
                          {p.name} (£
                          {discountedPrice(p.price, p.discount)})
                        </h1>
                      </div>
                    </Carousel.Caption>
                  </Col>
                }
              </Row>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ProductCarousel
