import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components";
import { NOTIFY } from "../../reducers/alertReducer";
import { POPULATE_ORDERS } from "../../reducers/orderReducer";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function OrdersDashboard() {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.order);
  useEffect(() => {
    async function populate() {
      try {
        await dispatch(POPULATE_ORDERS());
      } catch (error) {
        dispatch(NOTIFY("" + error, "warning", 2));
      }
    }
    populate();
  }, [dispatch]);
  return (
    <Layout title="Store Orders" description="Process new and pending orders">
      <p className="display-3 mb-5">
        Total Orders{" "}
        <span className="text-warning">{ordersData.totalOrders}</span>
      </p>
      <div>
        <Table striped responsive size="sm">
          <thead>
            <tr className="text-center">
              <th>Order No.</th>
              <th>OrderID</th>
              <th>Order Placed</th>
              <th>TransactionID</th>
              <th>Status</th>
              <th>Amount</th>
              <th>UserID</th>
              <th>User Name</th>
              <th>Delivery Address</th>
              <th>Details</th>
            </tr>
          </thead>
          {!isEmpty(ordersData.orders) && (
            <tbody>
              {ordersData.orders.map((order, index) => (
                <tr className="text-center" key={index} id={order._id}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>
                    <Moment fromNow>{order.createdAt}</Moment>
                  </td>
                  <td>{order.transaction_id}</td>
                  <td>
                    <span className="bg-primary text-light rounded p-1">
                      {order.status}
                    </span>
                  </td>
                  <td>{order.amount}</td>
                  <td>{order.user._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.address}</td>
                  <td>
                    <Link to={`/order-details/${order._id}`}>View Order</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        {isEmpty(ordersData.orders) && (
          <p className="text-muted">There are no orders to process</p>
        )}
      </div>
    </Layout>
  );
}

export default OrdersDashboard;
