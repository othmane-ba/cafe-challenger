import {
  GET_CLIENT,
  ADD_CLIENT,
  EDIT_CLIENT,
  DELETE_CLIENT,
  FIND_CLIENT,
  EDIT_PASSWORD,
} from '../actions/client.action';

const initialState = {};

export default function cartItemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENT:
      return action.payload;
    case FIND_CLIENT:
      return action.payload;
    case EDIT_PASSWORD:
      return action.payload;
    case ADD_CLIENT:
      return [action.payload, ...state];
    case EDIT_CLIENT:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            content: action.payload.content,
          };
        } else return item;
      });
    case DELETE_CLIENT:
      return state.filter((item) => item.id !== action.payload.productid);
    default:
      return state;
  }
}
