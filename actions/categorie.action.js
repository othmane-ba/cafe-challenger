import axios from 'axios';

export const GET_CATEGORIE = 'GET_CATEGORIE';

export const getCategorie = () => {
  return (dispatch) => {
    return axios
      .get(`http://ec2-3-83-98-74.compute-1.amazonaws.com:8080/category`)
      .then((res) => {
        dispatch({ type: GET_CATEGORIE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};