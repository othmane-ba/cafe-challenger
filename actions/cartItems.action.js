import axios from 'axios';

export const GET_CARTITEMS = 'GET_CARTITEMS';
export const ADD_CARTITEMS = 'ADD_CARTITEMS';
export const EDIT_CARTITEMS = 'EDIT_CARTITEMS';
export const DELETE_CARTITEMS = 'DELETE_CARTITEMS';

export const getCartItems = (id) => {
  return (dispatch) => {
    return axios
      .get(`http://192.168.100.65:8080/cart-items/cartID/${id}`)
      .then((res) => {
        dispatch({ type: GET_CARTITEMS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const addCartItems = (data) => {
  return (dispatch) => {
    return axios
      .post(`http://192.168.100.65:8080/cart-items`, data)
      .then(() => {
        dispatch({ type: ADD_CARTITEMS, payload: data });
      })
      .catch((err) => console.log(err));
  };
};
export const editCartItems = (data) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `http://192.168.100.65:8080/cart-items/${data.id}`,
      data: { ...data },
    })
      .then(() => {
        dispatch({ type: EDIT_CARTITEMS, payload: { ...data } });
      })
      .catch((err) => console.log(err));
  };
};
export const deleteCartItems = (productid) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `http://192.168.100.65:8080/cart-items/${productid}`,
    })
      .then(() => {
        dispatch({ type: DELETE_CARTITEMS, payload: { productid } });
      })
      .catch((err) => console.log(err));
  };
};