import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductCreateScreen({ history }) {
  const formData = new FormData()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = productCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/admin/productlist')
    }
  }, [successCreate, dispatch, history])

  const submitHandler = (e) => {
    e.preventDefault()
    formData.append('name', name)
    formData.append('price', price)

    formData.append('brand', brand)
    formData.append('category', category)
    formData.append('countInStock', countInStock)
    formData.append('description', description)
    dispatch(
      createProduct({
        formData,
      })
    )
  }

  const uploadHandler = (e) => {
    const file = e.target.files[0]
    setImage(e.target.files[0].name)

    formData.append('image', file)
  }

  return (
    <div>
      <Link to='/admin/productlist'>Go Back</Link>
      <FormContainer>
        <h1>Create Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              required
              placeholder='Enter your Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              required
              placeholder='Enter Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter Image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>

            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadHandler}
            ></Form.File>
          </Form.Group>
          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter Brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='countInStock'>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type='number'
              required
              placeholder='Enter stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ProductCreateScreen
