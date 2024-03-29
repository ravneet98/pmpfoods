import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Discount from "./Discount";
const Product = ({ product }) => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const discountedPrice = addDecimals(product.price * ((100 - product.discount) / 100));
  
  
  return product != null ? (
    <Card className='my-3 p-3 shadow' style={{ height: "32rem" }}>
      {product.discount > 0 ? (
        <Discount discount={`-${product.discount}%`} />
      ) : (
        ""
      )}

      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{ width: '100%',
    height: '20rem',
    objectFit: 'cover'}}
          
        />
      </Link>
      <Card.Body class='card-body'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        {product.discount > 0 ? (
          <Card.Text as='h3'>
            £{discountedPrice}
            <Card.Text
              style={{
                fontSize: "0.8rem",
                textDecorationLine: "line-through",
                color: "#9E9E9E",
              }}
            >
              £{product.price}
            </Card.Text>
          </Card.Text>
        ) : (
          <Card.Text as='h2'>£{product.price}</Card.Text>
        )}
      </Card.Body>
    </Card>
  ) : (
    ""
  );
};

export default Product;
