import {
  GET_CARTITEMS,
  ADD_CARTITEMS,
  EDIT_CARTITEMS,
  DELETE_CARTITEMS,
} from '../actions/cartItems.action';

const initialState = {};

export default function cartItemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARTITEMS:
      return action.payload;
    default:
      return state;
  }
}
