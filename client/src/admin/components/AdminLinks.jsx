import React from "react";
import { Badge, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminLinks({ totalOrders }) {
  return (
    <div>
      <Card className="mb-3">
        <Card.Header>Quick Links</Card.Header>
        <ListGroup>
          <ListGroupItem>
            <Link to="/create/category" className="text-decoration-none">
              <i className="fas fa-sitemap text-secondary"></i> Create Category
            </Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/create/product" className="text-decoration-none">
              <i className="fas fa-list text-secondary"></i> Create Product
            </Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/orders" className="text-decoration-none">
              <i className="fas fa-cash-register text-secondary"></i> View
              Orders <Badge bg="danger">{totalOrders}</Badge>
            </Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/manage/products" className="text-decoration-none">
              <i className="fas fa-filter text-secondary"></i> Manage Products
            </Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export default AdminLinks;
