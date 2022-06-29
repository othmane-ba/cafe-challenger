import axios from 'axios';

export const GET_MENU = 'GET_MENU';

export const getMenu = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/product`)
      .then((res) => {
        dispatch({ type: GET_MENU, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};