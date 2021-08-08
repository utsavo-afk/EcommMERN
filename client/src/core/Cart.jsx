import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import authHelper from "../auth/auth-helper";
import { Layout } from "../components";
import { NOTIFY } from "../reducers/alertReducer";
import {
  ADD_ITEM_TO_CART,
  CLEAR_CART,
  REDUCE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART,
} from "../reducers/cartReducer";
import ProductImg from "./components/ProductImg";
import { useHistory } from "react-router";
import Checkout from "../cart/components/Checkout";
import cartHelper from "../cart/cart-helper";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { items: itemList, count } = useSelector((state) => state.cart);

  const handleDiscardItem = (itemId, name) => {
    dispatch(REMOVE_ITEM_FROM_CART(itemId));
    dispatch(NOTIFY(`${name} deleted from cart`, "success", 2));
  };

  const handleClearCart = () => {
    dispatch(CLEAR_CART());
    dispatch(NOTIFY("Cart has been cleared", "secondary", 2));
  };

  const [show, setShow] = useState(false);
  const handleCheckout = () => {
    if (!authHelper.isAuthenticated()) {
      history.push("/login");
    }
    setShow(!show);
  };

  return (
    <Layout
      title="My Cart"
      description="Review items in your cart, Proceed to Checkout or continue Shopping"
    >
      <div>
        <p className="lead text-center">
          There are <span className="text-success">{count}</span> items in your
          cart
        </p>
        <Table striped className="mt-3" responsive>
          <thead>
            <tr className="text-center">
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discard</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(itemList) &&
              itemList.map((item, index) => (
                <tr className="text-center" key={index} id={item._id}>
                  <td>
                    <ProductImg id={item._id} name={item.product_name} />
                  </td>
                  <td>{item.description}</td>
                  <td>
                    <i
                      onClick={() => {
                        if (item.count > 1) {
                          dispatch(REDUCE_ITEM_FROM_CART(item));
                          dispatch(NOTIFY("Item removed", "secondary", 2));
                        }
                      }}
                      className="fas fa-minus text-danger"
                    ></i>{" "}
                    <span>{item.count}</span>{" "}
                    <i
                      onClick={() => {
                        dispatch(ADD_ITEM_TO_CART(item));
                        dispatch(NOTIFY("Item added", "success", 2));
                      }}
                      className="fas fa-plus text-primary"
                    ></i>
                  </td>
                  <td>💲{item.price * item.count}</td>
                  <td>
                    <Button
                      onClick={() =>
                        handleDiscardItem(item._id, item.product_name)
                      }
                      variant="outline-danger"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {isEmpty(itemList) && (
          <div className="d-flex align-items-baseline">
            <p>There are no items in your cart</p>
            <Button
              as={Link}
              to="/shop"
              className="mx-2 btn-sm"
              variant="outline-primary"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
      {!isEmpty(itemList) && (
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Button onClick={() => handleClearCart()} variant="danger">
            Clear Cart <i className="fas fa-times-circle"></i>
          </Button>
          <Button onClick={() => handleCheckout()} variant="success">
            {!isEmpty(itemList) && auth?.token
              ? show
                ? "Cancel Checkout"
                : "Checkout"
              : "Login and Proceed to Checkout"}
          </Button>
        </div>
      )}
      {show && !isEmpty(itemList) && auth?.token && (
        <Checkout
          products={itemList}
          amount={cartHelper.getCartTotal(itemList)}
        />
      )}
    </Layout>
  );
}

export default Cart;
