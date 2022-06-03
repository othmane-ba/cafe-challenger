import axios from 'axios';

export const FIND_CLIENT = 'FIND_CLIENT';
export const GET_CLIENT = 'GET_CLIENT';
export const ADD_CLIENT = 'ADD_CLIENT';
export const EDIT_CLIENT = 'EDIT_CLIENT';
export const DELETE_CLIENT = 'DELETE_CLIENT';

export const getClient = (data) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `http://192.168.100.65:8080/login/`,
      data: { ...data },
    })
      .then((res) => {
        localStorage.setItem('new',`${localStorage.getItem('new')}||${res.data[0].id}`)
        dispatch({ type: GET_CLIENT, payload: {...data} });
      })
  };
};
export const findClient = (id) => {
  return (dispatch) => {
    return axios
      .get(`http://192.168.100.65:8080/client/id/${id}`)
      .then((res) => {
        dispatch({ type: FIND_CLIENT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const addClient = (data) => {
  return (dispatch) => {
    return axios
      .post(`http://192.168.100.65:8080/client`, data)
      .then(() => {
        dispatch({ type: ADD_CLIENT, payload: data });
      })
  };
};
export const editClient = (data) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `http://192.168.100.65:8080/client/${data.id}`,
      data: { ...data },
    })
      .then(() => {
        dispatch({ type: EDIT_CLIENT, payload: { ...data } });
      })
      .catch((err) => console.log(err));
  };
};
export const deleteClient = (productid) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `http://192.168.100.65:8080/client/${productid}`,
    })
      .then(() => {
        dispatch({ type: DELETE_CLIENT, payload: { productid } });
      })
      .catch((err) => console.log(err));
  };
};
