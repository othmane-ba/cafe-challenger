import axios from 'axios';

export const GET_MENU = 'GET_MENU';

export const getMenu = () => {
  return (dispatch) => {
    return axios
      .get(`http://ec2-3-83-98-74.compute-1.amazonaws.com:8080/product`)
      .then((res) => {
        dispatch({ type: GET_MENU, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};