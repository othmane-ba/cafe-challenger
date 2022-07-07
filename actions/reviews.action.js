export const GET_REVIEWS = 'GET_REVIEWS';
export const getReview = (data) => {
  return (dispatch) => {
    return dispatch({ type: GET_REVIEWS, payload: data });
  };
};