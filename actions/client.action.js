import { store } from "../app/store";
import { Api_get, Api_post } from "../pages/api_calls";
export const GET_CLIENT = "GET_CLIENT";
export const getClient = (data) => {
  return (dispatch) => {
    return dispatch({ type: GET_CLIENT, payload: data });
  };
};
export const MajClient = async (action, data) => {
  await Api_post("maj-client", data, { action });
};
export const doLogin = async (action, data) => {
  const result = await Api_post("do-login", data, { action });
  console.log(result);
  localStorage.setItem("token", result.token);
  store.dispatch(getClient(result.output.client));
};
export const doLogout = async () => {
  await Api_get("do-log-out");
};
