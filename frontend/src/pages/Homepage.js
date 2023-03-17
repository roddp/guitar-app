import React, { useContext, useEffect, useReducer, useState } from 'react'
import ProductCard from '../components/ProductCard';
import axios from 'axios'
import * as actions from '../constants/ProductConst'
import * as CartActions from '../constants/CartConst'
import logger from 'use-reducer-logger'
import { Row, Col } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import { Store } from '../store/Store';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return { ...state, loading: true }
    case actions.FETCH_SUCCESS:
      return { ...state, products: action.payload, loading: false }
    case actions.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}


const Homepage = () => {

  const [{ products, loading, error }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });


  const getData = async () => {
    dispatch({ type: actions.FETCH_REQUEST });
    try {
      const prod = await axios.get("/api/products/");
      dispatch({ type: actions.FETCH_SUCCESS, payload: prod.data })
    } catch (error) {
      dispatch({ type: actions.FETCH_FAIL, payload: error.message })
    }


  }

  useEffect(() => {
    getData();

    return () => {

    }
  }, [])

  return (
    <div>
      <Helmet>
        <title>E-Guitars</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className='products-list'>
        <Row>
          {loading ? <Loading></Loading> : error ? <div>{error.message}</div> :
            products.map(data => (
              <Col sm={6} md={3} key={data._id} >
                <ProductCard item={data} key={data._id} />
              </Col>))}
        </Row>
      </div>
    </div >
  )
}

export default Homepage