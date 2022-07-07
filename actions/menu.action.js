export const GET_MENU = 'GET_MENU';
export const getMenu = (data) => {
  return (dispatch) => {
    return dispatch({ type: GET_MENU, payload: data });
  };
};