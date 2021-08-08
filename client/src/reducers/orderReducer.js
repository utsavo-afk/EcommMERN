import {
  readOrder,
  listOrders,
  getStatusOptions,
  updateOrderStatus,
} from "../admin/api";

const orderReducer = (
  state = { orders: [], order: null, totalOrders: 0, statusValues: [] },
  action
) => {
  switch (action.type) {
    case "POPULATE_ORDERS":
      return {
        ...state,
        orders: [...action.data.orders],
        totalOrders: action.data.total,
      };
    case "POPULATE_ORDER":
      return { ...state, order: action.data };
    case "POPULATE_ORDER_STATUSES":
      return { ...state, statusValues: [...action.data] };
    default:
      return state;
  }
};
export default orderReducer;

export const POPULATE_ORDERS = () => {
  return async (dispatch) => {
    let res = await listOrders();
    dispatch({
      type: "POPULATE_ORDERS",
      data: { orders: res.orders, total: res.orderCount },
    });
  };
};

export const POPULATE_ORDER = (id) => {
  return async (dispatch) => {
    let data = await readOrder(id);
    console.log(data);
    dispatch({
      type: "POPULATE_ORDER",
      data,
    });
  };
};

export const POPULATE_ORDER_STATUSES = () => {
  return async (dispatch) => {
    let data = await getStatusOptions();
    dispatch({
      type: "POPULATE_ORDER_STATUSES",
      data,
    });
  };
};

export const UPDATE_ORDER_STATUS = (status, id) => {
  return async (dispatch) => {
    let data = await updateOrderStatus(status, id);
    dispatch({
      type: "POPULATE_ORDER",
      data,
    });
  };
};
