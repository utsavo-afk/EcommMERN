const shopFilterReducer = (state = { category: [], price: [] }, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return { ...state, category: [...state.category, action.data] };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        category: state.category.filter((data) => data !== action.data),
      };
    case "ADD_RANGE":
      return { ...state, price: [...action.data] };
    default:
      return state;
  }
};
export default shopFilterReducer;

// category actions
export const ADD_CATEGORY = (data) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_CATEGORY",
      data,
    });
  };
};

export const REMOVE_CATEGORY = (data) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_CATEGORY",
      data,
    });
  };
};

export const ADD_PRICE_RANGE = (data) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_RANGE",
      data,
    });
  };
};
