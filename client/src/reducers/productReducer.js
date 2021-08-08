import {
  createProduct,
  deleteProduct,
  listAllProducts,
  listProducts,
  updateProduct,
} from "../admin/api";
import authHelper from "../auth/auth-helper";
import {
  listProductsByFilter,
  listProductsBySearch,
  listProductsHome,
  readProduct,
  suggestProducts,
} from "../core/api";

const productReducer = (
  state = { products: null, product: null, size: null },
  action
) => {
  switch (action.type) {
    case "INIT_PRODUCTS":
      return {
        ...state,
        products: [...action.data],
      };
    case "FILTERED_PRODUCTS":
      return {
        ...state,
        products: [...action.data.products],
        size: action.data.size,
      };
    case "MORE_PRODUCTS":
      return {
        ...state,
        products: [...state.products, ...action.data.products],
        size: action.data.size,
      };
    case "SEARCHED_PRODUCTS":
      return { ...state, products: [...action.data] };
    case "CREATE_PRODUCT":
      return { ...state, products: [...state.products, action.data] };
    case "INIT_PRODUCT":
      return { ...state, product: action.data };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.data._id
        ),
      };
    case "UPDATE_PRODUCT":
      return { ...state, product: action.data };
    default:
      return state;
  }
};
export default productReducer;

export const POPULATE_PRODUCTS = () => {
  return async (dispatch) => {
    let data = await listProducts();
    dispatch({
      type: "INIT_PRODUCTS",
      data,
    });
  };
};

export const POPULATE_PRODUCTS_HOME = (sortBy) => {
  return async (dispatch) => {
    let data = await listProductsHome(sortBy);
    dispatch({
      type: "INIT_PRODUCTS",
      data,
    });
  };
};

export const POPULATE_PRODUCTS_BY_SEARCH = (skip, limit, filter) => {
  return async (dispatch) => {
    let data = await listProductsByFilter(skip, limit, filter);
    dispatch({
      type: "FILTERED_PRODUCTS",
      data: { products: data.products, size: data.size },
    });
  };
};

export const LOAD_MORE_PRODUCTS = (skip, limit, filter) => {
  return async (dispatch) => {
    let data = await listProductsByFilter(skip, limit, filter);
    if (!data.size) throw new Error("No More Products");
    dispatch({
      type: "MORE_PRODUCTS",
      data: { products: data.products, size: data.size },
    });
  };
};

export const POPULATE_SEARCHED_PRODUCTS = (params) => {
  return async (dispatch) => {
    let data = await listProductsBySearch(params);
    dispatch({
      type: "SEARCHED_PRODUCTS",
      data,
    });
  };
};

export const CREATE_PRODUCT = (product) => {
  const { token, user } = authHelper.extractAuth();
  return async (dispatch) => {
    let data = await createProduct(token, user._id, product);
    dispatch({
      type: "CREATE_PRODUCT",
      data,
    });
  };
};

export const POPULATE_PRODUCT = (productId) => {
  return async (dispatch) => {
    let data = await readProduct(productId);
    dispatch({
      type: "INIT_PRODUCT",
      data,
    });
  };
};

export const POPULATE_SUGGESTED_PRODUCTS = (productId) => {
  return async (dispatch) => {
    let data = await suggestProducts(productId);
    dispatch({
      type: "INIT_PRODUCTS",
      data,
    });
  };
};

export const POPULATE_ALL_PRODUCTS_ADMIN = () => {
  return async (dispatch) => {
    let data = await listAllProducts();
    dispatch({
      type: "INIT_PRODUCTS",
      data,
    });
  };
};

export const ADMIN_DELETE_PRODUCT = (productId) => {
  return async (dispatch) => {
    let data = await deleteProduct(productId);
    dispatch({
      type: "DELETE_PRODUCT",
      data,
    });
  };
};

export const ADMIN_UPDATE_PRODUCT = (productId, payload) => {
  return async (dispatch) => {
    let data = await updateProduct(productId, payload);
    dispatch({
      type: "UPDATE_PRODUCT",
      data,
    });
  };
};
