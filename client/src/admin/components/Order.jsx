import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  Form,
  ListGroup,
  ListGroupItem,
  Spinner,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components";
import { NOTIFY } from "../../reducers/alertReducer";
import {
  POPULATE_ORDER,
  POPULATE_ORDER_STATUSES,
  UPDATE_ORDER_STATUS,
} from "../../reducers/orderReducer";
import Moment from "react-moment";
import { useField } from "../../hooks";

function Order({ match }) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);
  const statusValues = useSelector((state) => state.order.statusValues);

  useEffect(() => {
    async function populateOrder() {
      try {
        await dispatch(POPULATE_ORDER(match.params.id));
        await dispatch(POPULATE_ORDER_STATUSES());
      } catch (error) {
        dispatch(NOTIFY("" + error, "warning", 2));
      }
    }
    populateOrder();
  }, [dispatch, match.params.id]);
  console.log(order, statusValues);

  const { reset, ...status } = useField("text");
  const handleStatusUpdate = async (event) => {
    event.preventDefault();
    try {
      let data = {
        status: status.value,
      };
      await dispatch(UPDATE_ORDER_STATUS(data, order._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isEmpty(order) && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isEmpty(order) && (
        <Layout
          title="Order Details"
          description={<Moment fromNow>{order.createdAt}</Moment>}
        >
          <Card>
            <ListGroup>
              <ListGroupItem>
                <div className="d-flex justify-content-between">
                  <span>OrderID: {order._id}</span>
                  <span>
                    Status:{" "}
                    <span className="bg-info rounded p-1">{order.status}</span>
                  </span>
                  <Form onSubmit={handleStatusUpdate}>
                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Select
                        {...status}
                        className="mx-1"
                        size="sm"
                        aria-label="Status Update"
                      >
                        <option>{order.status}</option>
                        {!isEmpty(statusValues) &&
                          statusValues
                            .filter((s) => s !== order.status)
                            .map((s, index) => (
                              <option key={index} value={s}>
                                {s}
                              </option>
                            ))}
                      </Form.Select>
                      <Button type="submit" className="btn-sm">
                        Update
                      </Button>
                    </div>
                  </Form>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                Total Products in the order:{" "}
                {order.products.reduce((acc, item) => acc + item.count, 0)}
              </ListGroupItem>
              <ListGroupItem>
                <ListGroup>
                  Products:
                  <Table responsive striped size="sm">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Order Placed</th>
                        <th>Product ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((p, index) => (
                        <tr key={index} id={p._id}>
                          <td>{p.product_name}</td>
                          <td>💲{p.price}</td>
                          <td>{p.count}</td>
                          <td>💲{p.count * p.price}</td>
                          <td>{<Moment fromNow>{p.createdAt}</Moment>}</td>
                          <td>{p._id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Layout>
      )}
    </>
  );
}

export default Order;
