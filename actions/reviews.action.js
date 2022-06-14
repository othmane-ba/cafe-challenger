import axios from 'axios';

export const GET_REVIEWS = 'GET_REVIEWS';

export const getReview = () => {
  return (dispatch) => {
    return axios
      .get(`http://ec2-3-83-98-74.compute-1.amazonaws.com:8080/review`)
      .then((res) => {
        dispatch({ type: GET_REVIEWS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};