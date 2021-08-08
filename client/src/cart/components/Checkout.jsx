import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import {
  createOrder,
  getPaymentToken,
  processClientPayment,
} from "./../api/index";
import DropIn from "braintree-web-drop-in-react";
import { Badge, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NOTIFY } from "../../reducers/alertReducer";
import { CLEAR_CART } from "../../reducers/cartReducer";

function Checkout({ products, amount }) {
  console.log(products);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  useEffect(() => {
    if (!data.clientToken) {
      getPaymentToken()
        .then((res) => {
          setData({
            ...data,
            clientToken: res.clientToken,
            success: res.success,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [data]);

  const makePayment = (amount) => {
    if (!data.address)
      return dispatch(NOTIFY("Address is required to proceed", "warning", 3));

    data.instance
      .requestPaymentMethod()
      .then((res) => {
        let paymentObject = {
          nonce: res.nonce,
          amount,
        };
        processClientPayment(paymentObject)
          .then((res) => {
            const orderObject = {
              products,
              transaction_id: res.transaction.id,
              amount,
              address: data.address,
            };
            createOrder(orderObject)
              .then((res) => console.log(res))
              .catch((err) => dispatch(NOTIFY("" + err, "warning", 5)));
            setData({ ...data, success: res.success });
            dispatch(
              NOTIFY("Payment Successful! Order Confirmed", "success", 2)
            );
            dispatch(CLEAR_CART());
          })
          .catch((err) => dispatch(NOTIFY("" + err.message, "warning", 2)));
      })
      .catch((err) => dispatch(NOTIFY("" + err.message, "warning", 2)));
  };

  const showDropIn = () => {
    return (
      <>
        {data.clientToken && !isEmpty(products) && (
          <>
            <p className="lead ">Your Total: 💲{amount}</p>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                value={data.value}
                onChange={({ target }) =>
                  setData({ ...data, address: target.value })
                }
                placeholder="1234 Main St"
                required
              />
            </Form.Group>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: { flow: "vault" },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <Button onClick={() => makePayment(amount)} className="btn-success">
              <Badge bg="dark p-2">💲{amount}</Badge> Pay Now
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <div className="d-flex flex-column justify-content-start align-items-stretch">
      {showDropIn()}
    </div>
  );
}

export default Checkout;
