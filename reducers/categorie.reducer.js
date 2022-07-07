import { GET_CATEGORIE } from "../actions/categorie.action";

const initialState = {};

export default function categorieReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIE:
      return action.payload;
    default:
      return state;
  }
}
