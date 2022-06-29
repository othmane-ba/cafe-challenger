import axios from 'axios';

export const GET_CART = 'GET_CART';
export const DELETE_CART = 'DELETE_CART';

export const getCart = (id) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/cart/id/${id}`)
      .then((res) => {
        dispatch({ type: GET_CART, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const deleteCart = (id) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `http://localhost:8080/cart/${id}`,
    })
      .then(() => {
        dispatch({ type: DELETE_CART, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};
