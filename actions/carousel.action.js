import axios from 'axios';

export const GET_CAROUSEL = 'GET_CAROUSEL';

export const getCarousel = () => {
  return (dispatch) => {
    return axios
      .get(`https://cafe-challenger-backend.herokuapp.com/carousel`)
      .then((res) => {
        dispatch({ type: GET_CAROUSEL, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};