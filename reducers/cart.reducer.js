import {
  GET_CART,
  DELETE_CART,
} from '../actions/cart.action';

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.payload;
    default:
      return state;
  }
}
