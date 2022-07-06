export const GET_CATEGORIE = 'GET_CATEGORIE';

export const getCategorie = (data) => {
  return (dispatch) => {
    return dispatch({ type: GET_CATEGORIE, payload: data });
  };
};