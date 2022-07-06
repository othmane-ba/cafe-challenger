// import axios from 'axios';

// export const GET_CAROUSEL = 'GET_CAROUSEL';

// export const getCarousel = () => {
//   return (dispatch) => {
//     return axios
//       .get(`http://localhost:8080/carousel`)
//       .then((res) => {
//         dispatch({ type: GET_CAROUSEL, payload: res.data });
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const GET_CAROUSEL = 'GET_CAROUSEL';

export const getCarousel = (data) => {
  return (dispatch) => {
    return dispatch({ type: GET_CAROUSEL, payload: data });
  };
};