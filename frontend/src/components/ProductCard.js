import '../App.css'
import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings'
import { BsCart2 } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { Store } from '../store/Store'
import * as CartActions from '../constants/CartConst'

const ProductCard = ({ item }) => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === item._id);
    const qty = existItem ? existItem.qty + 1 : 1;
    ctxDispatch({ type: CartActions.CART_ADD_ITEM, payload: { ...item, qty } });
  };

  return (
    <Card bg='dark' text='light' className='mb-2'>
      <Link to={`/product/${item.slug}/${item._id}`}>
        <img src={item.image} alt='product' className='card-img-top'></img>
      </Link>
      <Card.Body>
        <Card.Title>
          <span className='item-manu'>{item.manufactor} </span>
          <span className='item-model'>{item.model}</span>
        </Card.Title>
        <Card.Subtitle>{item.price}€</Card.Subtitle>
        <Card.Text>
          <StarRatings
            starDimension='15px'
            starSpacing='3px'
            rating={item.rating}
            starRatedColor='yellow' />
        </Card.Text>
        <Button
          className='d-flex align-items-center'
          style={{ fontWeight: '600' }}
          onClick={() => addToCartHandler()}><BsCart2 size='1.5em'></BsCart2>Add to Cart</Button>
      </Card.Body>

    </Card >
  )
}

export default ProductCard