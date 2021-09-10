import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import Shipped from "../assets/shipped.png";
import Time from "../assets/back-in-time.png";
import Pay from "../assets/credit-card.png";


const data = [
  {
    id: 1,
    img: Shipped,
    title: "FREE SHIPPING",
    description: "For all order over 99£",
  },
  {
    id: 2,
    img: Time,
    title: "DELIVERY ON TIME",
    description: "If good have prolems",
  },
  {
    id: 3,
    img: Pay,
    title: "SECURE PAYMENT",
    description: "100% secure payment",
  },
];
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' class='btn btn-secondary'>
          Go Back
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {Object.keys(products).length > 0 ? (
            !keyword ? (
              <h1>Latest Products</h1>
            ) : (
              <h1>Results</h1>
            )
          ) : (
            <h1>Nothing Found! Please Try again</h1>
          )}

          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
          <div className='shipmentContainer'>
            {data.map((item, index) => (
              <div key={index} className='innerShipmentContainer'>
                <img src={item.img} alt='Logo'  />
                <div style={{ marginLeft: 30 }}>
                  <h1 style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.title}
                  </h1>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default HomeScreen
