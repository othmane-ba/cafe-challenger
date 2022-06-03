import {
  GET_ORDER,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
} from '../actions/order.action';

const initialState = {};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.payload;
    case ADD_ORDER:
      console.log(state)
      return [];
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
