import axios from 'axios';

export const GET_CART = 'GET_CART';

export const getCart = (id) => {
  return (dispatch) => {
    return axios
      .get(`http://192.168.100.65:8080/cart/id/${id}`)
      .then((res) => {
        dispatch({ type: GET_CART, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};