import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [state, setState] = useState(shippingAddress.state)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, state, country, postalCode }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter your Address'
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter your City'
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='state'>
          <Form.Label>State</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter your State'
            value={state ? state : ''}
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter your Country'
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter your PostalCode'
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
