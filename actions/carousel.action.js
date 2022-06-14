import axios from 'axios';

export const GET_CAROUSEL = 'GET_CAROUSEL';

export const getCarousel = () => {
  return (dispatch) => {
    return axios
      .get(`http://ec2-3-83-98-74.compute-1.amazonaws.com:8080/carousel`)
      .then((res) => {
        dispatch({ type: GET_CAROUSEL, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};