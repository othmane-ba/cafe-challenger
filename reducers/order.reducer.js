import {
  GET_ORDER,
  GET_ORDER_DETAILS,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
} from '../actions/order.action';

const initialState = {};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.payload;
    case GET_ORDER_DETAILS:
      return action.payload;
    case ADD_ORDER:
      return [action.payload,state];
    case EDIT_ORDER:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            content: action.payload.content,
          };
        } else return item;
      });
    case DELETE_ORDER:
      return state.filter((item) => item.id !== action.payload.productid);
    default:
      return state;
  }
}
