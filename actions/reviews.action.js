import axios from 'axios';

export const GET_REVIEWS = 'GET_REVIEWS';

export const getReview = () => {
  return (dispatch) => {
    return axios
      .get(`http://192.168.100.65:8080/review`)
      .then((res) => {
        dispatch({ type: GET_REVIEWS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};