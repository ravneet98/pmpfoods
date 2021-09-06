import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import Discount from "./Discount";

const ProductCarousel = () => {
   const addDecimals = (num) => {
     return (Math.round(num * 100) / 100).toFixed(2);
   };
   const discountedPrice = (price, discount) => {
     return addDecimals(price * ((100 - discount) / 100));
   };
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      className='bg-dark rounded'
      variant='dark'
     >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            
          </Link>
          <Carousel.Caption className='carousel-caption'>
            <h2>
              {product.name} (${discountedPrice(product.price,product.discount)})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
