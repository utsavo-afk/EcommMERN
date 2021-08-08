import cartHelper from "./../cart/cart-helper";

const cartReducer = (state = { items: [], count: 0 }, action) => {
  switch (action.type) {
    case "POPULATE_CART":
      return {
        ...state,
        items: [...action.data.items],
        count: action.data.count,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...action.data.items],
        count: action.data.count,
      };
    case "REDUCE_ITEM_FROM_CART":
      return {
        ...state,
        items: [...action.data.items],
        count: action.data.count,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: [...action.data.items],
        count: action.data.count,
      };
    case "CLEAR_CART":
      return { ...state, items: action.data.items, count: action.data.count };
    default:
      return state;
  }
};
export default cartReducer;

export const POPULATE_CART_FROM_CACHE = () => {
  let cartItems = cartHelper.loadCartFromCache();
  return (dispatch) => {
    dispatch({
      type: "POPULATE_CART",
      data: {
        items: cartItems,
        count: cartItems?.reduce((acc, item) => acc + item.count, 0) || 0,
      },
    });
  };
};

export const ADD_ITEM_TO_CART = (item) => {
  let cartItems = cartHelper.loadCartFromCache();
  let cartItem = cartItems.find((el) => el._id === item._id);

  // add new item else increment count of already exisitng
  if (!cartItem) {
    item.count += 1;
    cartItems = [...cartItems, item];
  } else {
    cartItem.count += 1;
    cartItems = cartItems.map((el) =>
      el._id === cartItem._id ? cartItem : el
    );
  }

  return (dispatch) => {
    dispatch({
      type: "ADD_TO_CART",
      data: {
        items: cartItems,
        count: cartItems?.reduce((acc, item) => acc + item.count, 0) || 0,
      },
    });
    cartHelper.saveCartToCache(cartItems);
  };
};

export const REMOVE_ITEM_FROM_CART = (itemId) => {
  let cartItems = cartHelper.loadCartFromCache();
  let updatedItems = cartItems.filter((item) => item._id !== itemId);
  return (dispatch) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      data: {
        items: updatedItems,
        count: cartItems?.reduce((acc, item) => acc + item.count, 0) || 0,
      },
    });
    cartHelper.saveCartToCache(updatedItems);
  };
};

export const REDUCE_ITEM_FROM_CART = (item) => {
  let cartItems = cartHelper.loadCartFromCache();
  let cartItem = cartItems.find((el) => el._id === item._id);

  if (cartItem.count > 1) {
    cartItem.count = cartItem.count - 1;
    cartItems = cartItems.map((el) =>
      el._id === cartItem._id ? cartItem : el
    );
  }

  return (dispatch) => {
    dispatch({
      type: "REDUCE_ITEM_FROM_CART",
      data: {
        items: cartItems,
        count: cartItems?.reduce((acc, item) => acc + item.count, 0) || 0,
      },
    });
    cartHelper.saveCartToCache(cartItems);
  };
};

export const CLEAR_CART = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_CART",
      data: { items: [], count: 0 },
    });
    localStorage.removeItem("cart");
  };
};
