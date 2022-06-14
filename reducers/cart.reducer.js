import {
  GET_CART,
  DELETE_CART,
} from '../actions/cart.action';

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.payload;
    case DELETE_CART:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}
