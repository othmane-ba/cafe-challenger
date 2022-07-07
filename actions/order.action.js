import { Api_post } from "../pages/api_calls";
export const GET_ORDER = "GET_ORDER";
export const getOrder = (data) => {
  return (dispatch) => {
    return dispatch({ type: GET_ORDER, payload: data });
  };
};
export const MajOrder = async (action, data) => {
  const result = await Api_post("maj-order", data, { action });
};