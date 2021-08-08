import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NOTIFY } from "../../reducers/alertReducer";
import { getOrderHistory } from "../api";
import { Layout } from "./../../components";
import UserLinks from "./UserLinks";
import Moment from "react-moment";

function UserDashboard() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    getOrderHistory()
      .then((res) => {
        setOrderHistory(res);
      })
      .catch((err) => dispatch(NOTIFY("" + err, "warning", 2)));
  }, [dispatch]);
  console.log(orderHistory);
  return (
    <Layout
      title="Dashboard"
      description="Your account information and order history"
    >
      <Row>
        <Col sm={4}>
          <UserLinks />
        </Col>
        <Col sm={8}>
          <Card className="mb-3">
            <Card.Header className="lead">Your Account Information</Card.Header>
            <ListGroup>
              <ListGroupItem className="text-muted">
                Name <span className="text-dark">{auth?.user?.name}</span>
              </ListGroupItem>
              <ListGroupItem className="text-muted">
                Email <span className="text-dark">{auth?.user?.email}</span>
              </ListGroupItem>
              <ListGroupItem className="text-muted">
                <div className="d-flex justify-content-between align-items-baseline">
                  <div>
                    Role{" "}
                    <span className="text-dark">
                      {auth?.user?.isAdmin ? "Admin " : "Member"}
                    </span>
                  </div>
                  {auth?.user?.isAdmin && (
                    <div>
                      <Button
                        as={Link}
                        to="/admin/dashboard"
                        className="btn-sm btn-dark"
                      >
                        <i className="fas fa-crown text-warning"></i> Admin
                        Panel
                      </Button>
                    </div>
                  )}
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card>
            <Card.Header className="lead">Your Order History</Card.Header>
            <Table responsive size="sm">
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Ordered On</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              {!isEmpty(orderHistory) && (
                <tbody>
                  {orderHistory.map((order, index) => (
                    <tr key={index} id={order._id}>
                      <td>{index + 1}</td>
                      <td>{<Moment fromNow>{order.createdAt}</Moment>}</td>
                      <td>💲{order.amount}</td>
                      <td>{order.status}</td>
                      <td>{order.transaction_id}</td>
                    </tr>
                  ))}
                </tbody>
              )}
              {isEmpty(orderHistory) && <p>You have not placed any orders</p>}
            </Table>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default UserDashboard;
