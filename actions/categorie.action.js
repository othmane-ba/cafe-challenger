import axios from 'axios';

export const GET_CATEGORIE = 'GET_CATEGORIE';

export const getCategorie = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/category`)
      .then((res) => {
        dispatch({ type: GET_CATEGORIE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};