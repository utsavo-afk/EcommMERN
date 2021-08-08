import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOTIFY } from "../../reducers/alertReducer";
import { POPULATE_SUGGESTED_PRODUCTS } from "../../reducers/productReducer";
import { isEmpty } from "lodash";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

function RelevantProducts({ id }) {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.product.products);
  useEffect(() => {
    async function populateSuggested() {
      try {
        await dispatch(POPULATE_SUGGESTED_PRODUCTS(id));
      } catch (error) {
        dispatch(NOTIFY("" + error, "warning", 3));
      }
    }
    populateSuggested();
  }, [dispatch, id]);
  return (
    <>
      {!isEmpty(productsList) && (
        <div>
          <p className="lead text-secondary mb-3">Related products</p>
          <Row xs={2} md={3} lg={4} className="g-2">
            {productsList &&
              productsList.map((p, index) => (
                <Col key={index}>
                  <ProductCard key={p._id} product={p} />
                </Col>
              ))}
          </Row>
        </div>
      )}
    </>
  );
}

export default RelevantProducts;
