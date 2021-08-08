import React, { useEffect } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "./../../components";
import { NOTIFY } from "../../reducers/alertReducer";
import { POPULATE_CATEGORIES } from "../../reducers/categoryReducer";
import AdminLinks from "./AdminLinks";
import { POPULATE_ORDERS } from "../../reducers/orderReducer";

function AdminDashboard() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.category.categories);
  const totalOrders = useSelector((state) => state.order.totalOrders);

  useEffect(() => {
    async function populate() {
      try {
        await dispatch(POPULATE_CATEGORIES());
        await dispatch(POPULATE_ORDERS());
      } catch ({ error }) {
        dispatch(NOTIFY("" + error, "warning", 3));
      }
    }
    populate();
  }, [dispatch]);

  return (
    <Layout title="Admin Panel" description="Manage your store here">
      <Row>
        <Col sm={4}>
          <AdminLinks totalOrders={totalOrders} />
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
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="mb-3">
            <Card.Header className="lead">Categories</Card.Header>
            <ListGroup>
              {categories &&
                categories.map((c) => (
                  <ListGroupItem key={c._id}>{c.name}</ListGroupItem>
                ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default AdminDashboard;
