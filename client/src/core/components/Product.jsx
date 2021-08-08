import React, { useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components";
import { POPULATE_PRODUCT } from "../../reducers/productReducer";
import ProductImg from "./ProductImg";
import Moment from "react-moment";
import RelevantProducts from "./RelevantProducts";
import { NOTIFY } from "../../reducers/alertReducer";
import { ADD_ITEM_TO_CART } from "../../reducers/cartReducer";

function Product({ match }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    async function populateProduct() {
      try {
        await dispatch(POPULATE_PRODUCT(match.params.id));
      } catch (error) {
        console.log(error);
      }
    }
    populateProduct();
  }, [dispatch, match.params.id]);

  const addItemToCart = (item, name) => {
    dispatch(ADD_ITEM_TO_CART(item));
    dispatch(NOTIFY(`${name} added to cart`, "success", 2));
  };

  if (!product) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Layout title={product.product_name} description={product.description}>
      <div style={{ minHeight: "50vh" }} className="bg-light p-3">
        <Row className="align-items-center">
          <Col sm={12} md={4} className="mb-3">
            <ProductImg id={product._id} name={product.peoduct_name} />
            <div className="text-center">
              <p className="lead bg-light">💲{product.price}</p>
              {product.quantity ? (
                <Button
                  onClick={() => addItemToCart(product, product.product_name)}
                  variant="success"
                  className="btn-sm"
                >
                  Add to Cart
                </Button>
              ) : (
                <Badge bg="secondary">Out of Stock</Badge>
              )}
            </div>
          </Col>
          <Col sm={12} md={8}>
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-between">
                  <span>{product.product_name}</span>
                  <Badge bg="secondary">
                    {product.quantity
                      ? `${product.quantity} In Stock`
                      : "Out of Stock"}
                  </Badge>
                </div>
              </Card.Header>
              <ListGroup>
                <ListGroupItem>
                  <span className="text-secondary me-2">Description</span>
                  {product?.description}
                </ListGroupItem>
                <ListGroupItem>
                  <span className="text-secondary me-2">Category</span>
                  <Badge bg="info">{product?.category.name}</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="text-secondary me-2">Shipping</span>
                  {product?.shipping ? "Available" : "Not available"}
                </ListGroupItem>
                <ListGroupItem>
                  <span className="text-secondary me-2">Price</span>
                  💲{product.price}
                </ListGroupItem>
                <ListGroupItem>
                  <span className="text-secondary me-2">Added</span>
                  <Moment fromNow>{product.createdAt}</Moment>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
      <hr className="mb-3" />

      <RelevantProducts id={product._id} />
    </Layout>
  );
}

export default Product;
