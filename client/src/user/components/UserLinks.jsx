import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserLinks() {
  return (
    <Card className="mb-3">
      <Card.Header>Quick Links</Card.Header>
      <ListGroup>
        <ListGroupItem>
          <Link to="/cart" className="text-decoration-none">
            <i className="fas fa-shopping-cart text-secondary"></i> My Cart
          </Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link to="/profile/update" className="text-decoration-none">
            <i className="fas fa-cog text-secondary"></i> Update Profile
          </Link>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default UserLinks;
