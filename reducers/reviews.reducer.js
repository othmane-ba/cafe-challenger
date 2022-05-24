import {
  GET_REVIEWS,
} from '../actions/reviews.action';

const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.payload;
    default:
      return state;
  }
}
