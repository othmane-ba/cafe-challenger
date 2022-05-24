import { FormControlUnstyled } from '@mui/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartList from '../components/CartList';
import Layout from '../components/Layout';

export default function cart() {
  const cart = useSelector(state => state.cart.cart);

  return (
    <Layout subtitle="Your Cart">
      <CartList cart={cart}/>
    </Layout>
  )
}
