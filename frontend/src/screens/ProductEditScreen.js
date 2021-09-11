import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const options = [
  { value: "Fruits", label: "Fresh Fruits" },
  { value: "Vegetables", label: "Fresh Vegetables" },
  { value: "Grocery", label: "Grocery" },
  { value: "Flour", label: "Atta & Flour" },
  { value: "Rice", label: "Rice & Rice Products" },
  { value: "SpicesAndHerbs", label: "Spices & Herbs" },
  { value: "ReadyMeals", label: "Ready Meals" },
  { value: "SweetAndSnacks", label: "Sweets & Snacks" },
  { value: "Beverages", label: "Grocery" },
  { value: "Others", label: "Others" },
];
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [option, setOption] = useState();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDiscount(product.discount);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        discount,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };
  
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
               
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='mt-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
               
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='discount' className='mt-2'>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter discount %'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='mt-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
              
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                custom
                onChange={uploadFileHandler}
                class='form-control mt-2'
              
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand' className='mt-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='mt-2'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='mt-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
               
                as='select'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              
              >
                <option value=''>Select category</option>
                <option value='Fruits'>Fresh Fruits</option>
                <option value='Vegetables'>Fresh Vegetables</option>
                <option value='Grocery'>Grocery</option>
                <option value='Flour'>Atta &amp; Flour</option>
                <option value='Rice'>Rice &amp; Rice Products</option>
                <option value='SpicesAndHerbs'>Spices &amp; Herbs</option>
                <option value='ReadyMeals'>Ready Meals</option>
                <option value='SweetAndSnacks'>Sweets &amp; Snacks</option>
                <option value='Beverages'>Beverages</option>
                <option value='Others'>Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='mt-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='btn btn-info' className='mt-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
