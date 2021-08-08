import { signin } from "../auth/api";
import { decode } from "jsonwebtoken";
import authHelper from "../auth/auth-helper";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return action.data;
    case "CLEAR_AUTH":
      return action.data;
    default:
      return state;
  }
};
export default authReducer;

export const SET_AUTH = (credentials) => {
  return async (dispatch) => {
    let res = await signin(credentials);
    localStorage.setItem("auth", JSON.stringify(res));
    dispatch({
      type: "SET_AUTH",
      data: res,
    });
  };
};

export const IS_USER_CACHED = () => {
  return (dispatch) => {
    if (localStorage.getItem("auth")) {
      let data = JSON.parse(localStorage.getItem("auth"));
      dispatch({
        type: "SET_AUTH",
        data,
      });
    }
  };
};

export const LOGOUT = (history) => {
  return (dispatch) => {
    localStorage.removeItem("auth");
    dispatch({
      type: "CLEAR_AUTH",
      data: null,
    });
    history.push("/");
  };
};

export const IS_TOKEN_EXPIERD = (history) => {
  return (dispatch) => {
    if (localStorage.getItem("auth")) {
      const { token } = authHelper.extractAuth();
      const { exp } = decode(token);
      let expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        dispatch({
          type: "CLEAR_AUTH",
          data: null,
        });
        localStorage.removeItem("auth");
        history.push("/");
      }
    }
  };
};
