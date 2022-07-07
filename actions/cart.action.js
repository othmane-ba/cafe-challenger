export const GET_CART = "GET_CART";
export const getCart = (data) => {
  return (dispatch) => {
    return dispatch({ type: GET_CART, payload: data });
  };
};
