const alertReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return action.data;
    case "CLEAR_ALERT":
      return action.data;
    default:
      return state;
  }
};
export default alertReducer;

export const NOTIFY = (msg, type, seconds) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ALERT",
      data: { msg, type },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_ALERT",
        data: null,
      });
    }, 1000 * seconds);
  };
};

export const CLEAR_ALERT = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ALERT",
      data: null,
    });
  };
};
