import React, { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NOTIFY } from "../reducers/alertReducer";
import { POPULATE_PRODUCTS_HOME } from "../reducers/productReducer";
import ProductCard from "./components/ProductCard";
import { Layout } from "./../components";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("sold");

  const productsList = useSelector((state) => state.product.products);
  useEffect(() => {
    async function populate() {
      try {
        await dispatch(POPULATE_PRODUCTS_HOME(sortBy));
      } catch ({ error }) {
        dispatch(NOTIFY("" + error, "warning", 3));
      }
    }
    populate();
  }, [dispatch, sortBy]);
  console.log(productsList);

  return (
    <Layout title="Welcome" description="A Node & React E-Commerce App">
      <div className="mb-5">
        <FloatingLabel label="Filter products by">
          <Form.Select
            className="bg-light"
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="filter products by"
          >
            <option value="sold">Best Sellers</option>
            <option value="createdAt">Latest Arrivals</option>
          </Form.Select>
        </FloatingLabel>
      </div>
      <div className="d-flex justify-content-between align-items-baseline">
        <p className="display-5">
          {sortBy === "sold" ? "Best Sellers" : "Latest Arrivals"}
        </p>
        <Button
          as={Link}
          to="/shop"
          className="btn-sm"
          variant="outline-secondary"
        >
          See More...
        </Button>
      </div>
      <hr />
      <div>
        <Row xs={1} md={2} lg={4} className="g-4">
          {productsList &&
            productsList.map((p, index) => (
              <Col key={index}>
                <ProductCard key={p._id} product={p} />
              </Col>
            ))}
        </Row>
      </div>
    </Layout>
  );
}

export default Home;
