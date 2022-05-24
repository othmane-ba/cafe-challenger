import {
  GET_CAROUSEL,
} from '../actions/carousel.action';

const initialState = {};

export default function carouselReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAROUSEL:
      return action.payload;
    default:
      return state;
  }
}
