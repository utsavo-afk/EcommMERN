import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import alertReducer from "./reducers/alertReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import categoryReducer from "./reducers/categoryReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productReducer";
import shopFilterReducer from "./reducers/shopFilterReducer";

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  category: categoryReducer,
  product: productReducer,
  shopFilter: shopFilterReducer,
  cart: cartReducer,
  order: orderReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
