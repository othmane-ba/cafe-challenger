import Layout from "../components/menu/Layout"
import ChallengerMenu from "../components/menu"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../actions/cart.action";
import { isEmpty } from "../utils/Utils";

export default function Menu() {
  const cart = useSelector((state) => state.cart);
  const cartitems = useSelector((state) => state.cartitems);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCart(!isEmpty(cart) && cart[0].id))
  },[cartitems])
  return (
    <Layout>
        <ChallengerMenu/>
    </Layout>
  )
}
