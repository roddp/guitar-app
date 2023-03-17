import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { Badge, Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Loading from '../components/Loading';
import * as ProductActions from '../constants/ProductConst'
import * as CartActions from '../constants/CartConst'
import { Store } from '../store/Store';

const reducer = (state, action) => {
  switch (action.type) {
    case ProductActions.FETCH_REQUEST:
      return { ...state, loading: true };
    case ProductActions.FETCH_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case ProductActions.FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const ProductDetails = () => {
  const stock = true;
  const navigate = useNavigate();
  const { id } = useParams();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;




  const getProduct = async () => {
    dispatch({ type: ProductActions.FETCH_REQUEST });
    try {
      const data = await axios.get(`/api/products/${id}`);
      dispatch({ type: ProductActions.FETCH_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: ProductActions.FETCH_FAIL, payload: error.message });
    }
  }

  useEffect(() => {
    getProduct();

    return () => {

    }
  }, [id])


  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const qty = existItem ? existItem.qty + 1 : 1;
    ctxDispatch({ type: CartActions.CART_ADD_ITEM, payload: { ...product, qty } });
    navigate('/cart');
  };

  const [{ product, loading, error }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: ''
  });


  return (loading ? <Loading /> :
    <div>
      <Row>
        <Col md={5}>
          <img src={product.image} alt={product.slug}></img>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item variant='dark'>
              <Helmet>
                <title>{product.manufactor} {product.model}</title>
              </Helmet>
              <h1>{product.manufactor} {product.model}</h1>
            </ListGroup.Item>

            <ListGroup.Item variant='dark'>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span>
                  <StarRatings
                    starDimension='25px'
                    starSpacing='3px'
                    rating={product.rating}
                    starRatedColor='gold'
                    starEmptyColor='black'
                  ></StarRatings>
                </span>
                <span style={{ alignSelf: 'center', fontWeight: '700', marginLeft: '10px' }}>{product.numbReviews} Reviews</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item variant='dark'>
              <ul style={{ fontWeight: '600', listStyleType: 'circle' }}>
                <li>{product.details.desc}</li>
                <li>{product.details.desc1}</li>
                <li>{product.details.desc2}</li>
              </ul>
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <ListGroup.Item variant='dark' className='d-flex justify-content-between align-items-center'>
              Price:<span style={{ fontWeight: '1000', fontSize: '2rem' }}>{product.price}€</span>
            </ListGroup.Item>
            <ListGroup.Item variant='dark' className='d-flex justify-content-between align-items-center'>
              Status: {stock ? <Badge bg='success'>In Stock</Badge> : <Badge bg='danger'>Out of Stock</Badge>}
            </ListGroup.Item>
            <ListGroup.Item variant='dark'>
              <Button className='w-100' onClick={addToCartHandler}>Add to Cart</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetails