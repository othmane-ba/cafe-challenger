import { FormControlUnstyled } from '@mui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../actions/cart.action';
import CartList from '../components/CartList';
import Layout from '../components/Layout';
import { isEmpty } from '../utils/Utils';

export default function cart() {
  const cartitems = useSelector((state) => state.cartitems);
  const cart = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getCart(!isEmpty(cart) && cart[0].id))
      setTotalPrice(!isEmpty(cart[0]) && cart[0].total);
      console.log('hello')
  },[cartitems])

  return (
    <Layout subtitle="Your Cart">
      <CartList cart={cartitems} totalPrice={totalPrice}/>
    </Layout>
  )
}
