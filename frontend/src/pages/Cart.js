import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Store } from '../store/Store'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillPlusCircle } from 'react-icons/ai'
import { AiFillMinusCircle } from 'react-icons/ai'
import * as cartActions from '../constants/CartConst'

const Cart = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;


  const updateCartHandler = (item, qty) => {
    if (qty >= 1) {
      ctxDispatch({ type: cartActions.CART_ADD_ITEM, payload: { ...item, qty } })
    }
  }

  const deleteItemHandler = (item) => {
    ctxDispatch({ type: cartActions.CART_DELETE_ITEM, payload: item })
  }

  // const [cartItems, setcartItems] = useState([]);

  // const getData = async () => {
  //   const data = await axios.get('/api/products');
  //   setcartItems(data.data);
  // }

  // useEffect(() => {
  //   getData();

  //   return () => {

  //   }
  // }, [])


  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={6}>
          {!cartItems ? <div>Cart is empty</div> :

            cartItems.map(item => (
              <Row className='mb-2 border-top d-flex' key={item._id} >
                <Col md={3}>
                  <img src={item.image} alt='productImg' className='img-fluid rounded img-thumbnail'></img>
                </Col>
                <Col>
                  <Row className='mb-4'>
                    <div className='d-flex justify-content-between m-1'>
                      <div className='d-flex flex-column'>
                        <div><b>{item.manufactor}</b> {item.model}</div>
                        <div style={{ color: 'green', fontWeight: '500' }}>In Stock</div>
                      </div>
                      <div>
                        <span className='m-2' onClick={() => updateCartHandler(item, item.qty + 1)}>
                          <AiFillPlusCircle></AiFillPlusCircle>
                        </span>
                        <span>{item.qty}</span>
                        <span className='m-2' onClick={() => updateCartHandler(item, item.qty - 1)}><AiFillMinusCircle></AiFillMinusCircle></span>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <div className='d-flex justify-content-between'>
                      <div className='btn-something d-flex'>
                        <Button className='btn btn-danger me-1' type='button' onClick={() => deleteItemHandler(item)}><BsFillTrashFill></BsFillTrashFill></Button>
                        <Button className='btn btn-primary' type='button'><AiOutlineHeart></AiOutlineHeart></Button>
                      </div>
                      <div className='price-font'>{item.price}€</div>
                    </div>
                  </Row>
                </Col>
              </Row>

            ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <h3>
                    Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items):
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}€
                  </h3>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row >
    </div >
  )
}

export default Cart