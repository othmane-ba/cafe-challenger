export const GET_CAROUSEL = 'GET_CAROUSEL';
export const getCarousel = (data) => {
  return (dispatch) => {
    return dispatch({ type: GET_CAROUSEL, payload: data });
  };
};