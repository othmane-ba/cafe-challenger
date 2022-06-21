import axios from 'axios';

export const GET_MENU = 'GET_MENU';

export const getMenu = () => {
  return (dispatch) => {
    return axios
      .get(`https://cafe-challenger-backend.herokuapp.com/product`)
      .then((res) => {
        dispatch({ type: GET_MENU, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};