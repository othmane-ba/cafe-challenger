import axios from 'axios';

export const GET_ORDER = 'GET_ORDER';
export const ADD_ORDER = 'ADD_ORDER';
export const EDIT_ORDER = 'EDIT_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const getOrder = () => {
  var client_id=localStorage.getItem('new').split('||')
  return (dispatch) => {
    return axios
      .get(`https://cafe-challenger-backend.herokuapp.com/order/clientID/${client_id[1]}`)
      .then((res) => {
        dispatch({ type: GET_ORDER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const addOrder = (data) => {
  var cart_id=localStorage.getItem('cart_id')
  return (dispatch) => {
    return axios
      .post(`https://cafe-challenger-backend.herokuapp.com/order/cartID/${cart_id}`, data)
      .then(() => {
        dispatch({ type: ADD_ORDER, payload: data });
      })
  };
};
export const editOrder = (data) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `https://cafe-challenger-backend.herokuapp.com/order/${data.id}`,
      data: { ...data },
    })
      .then(() => {
        dispatch({ type: EDIT_ORDER, payload: { ...data } });
      })
      .catch((err) => console.log(err));
  };
};
export const deleteOrder = (id) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `https://cafe-challenger-backend.herokuapp.com/order/${id}`,
    })
      .then(() => {
        dispatch({ type: DELETE_ORDER, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};
