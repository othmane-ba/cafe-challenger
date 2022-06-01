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
    case ADD_CARTITEMS:
      return [action.payload, ...state];
    case EDIT_CARTITEMS:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            content: action.payload.content,
          };
        } else return item;
      });
    case DELETE_CARTITEMS:
      return state.filter((item) => item.id !== action.payload.productid);
    default:
      return state;
  }
}
