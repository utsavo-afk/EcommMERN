import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NOTIFY } from "../../reducers/alertReducer";
import { ADD_ITEM_TO_CART } from "../../reducers/cartReducer";
import ProductImg from "./ProductImg";

function ProductCard({ product: p }) {
  const dispatch = useDispatch();

  const addItemToCart = (id, name) => {
    dispatch(ADD_ITEM_TO_CART(id));
    dispatch(NOTIFY(`${name} added to cart`, "success", 2));
  };

  return (
    <Card className="bg-light" id={p._id}>
      <Card.Header>{p.product_name}</Card.Header>
      <Card.Body>
        <ProductImg id={p._id} name={p.product_name} />
        <Card.Text>{p.description}</Card.Text>
        <Card.Text>💲{p.price}</Card.Text>
        <div className="d-grid gap-2">
          <Button
            as={Link}
            to={`/product/${p._id}`}
            className="btn-sm btn-warning"
          >
            <i className="fas fa-eye text-dark"></i> View Details
          </Button>
          <Button
            onClick={() => addItemToCart(p, p.product_name)}
            className="btn-sm btn-success"
          >
            <i className="fas fa-shopping-cart text-light"></i> Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
