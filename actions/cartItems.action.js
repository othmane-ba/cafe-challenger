import { store } from '../app/store';
import { Api_post } from '../pages/api_calls';
import { getCart } from './cart.action';
export const MajCartItems = async(action,data) => {
  const result=await Api_post('maj-cart',data,{action})
  store.dispatch(getCart(result.output.dl.cart));
};
