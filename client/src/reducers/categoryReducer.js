import { createCategory, listCategories } from "../admin/api";
import authHelper from "../auth/auth-helper";

const categoryReducer = (
  state = { categories: null, category: null },
  action
) => {
  switch (action.type) {
    case "INIT_CATEGORIES":
      return { ...state, categories: [...action.data] };
    case "CREATE_CATEGORY":
      return { ...state, categories: [...state.categories, action.data] };
    default:
      return state;
  }
};
export default categoryReducer;

// actions
export const POPULATE_CATEGORIES = () => {
  return async (dispatch) => {
    let res = await listCategories();
    dispatch({
      type: "INIT_CATEGORIES",
      data: res,
    });
  };
};

export const CREATE_CATEGORY = (data) => {
  const { token, user } = authHelper.extractAuth();
  return async (dispatch) => {
    let res = await createCategory(token, user._id, data);
    dispatch({
      type: "CREATE_CATEGORY",
      data: res,
    });
  };
};
