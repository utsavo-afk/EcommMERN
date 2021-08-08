import React, { useEffect, useRef } from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components";
import { NOTIFY } from "../reducers/alertReducer";
import {
  LOAD_MORE_PRODUCTS,
  POPULATE_PRODUCTS_BY_SEARCH,
  POPULATE_SEARCHED_PRODUCTS,
} from "../reducers/productReducer";
import { ProductCard, ShopFilter } from "./components";
import { isEmpty } from "lodash";
import { useField } from "./../hooks";

function Shop() {
  const dispatch = useDispatch();
  const { reset: resetSearch, ...searchStr } = useField("search");
  const { reset: resetCategory, ...optCategory } = useField("text");
  const resetFields = () => {
    resetSearch();
    resetCategory();
  };

  const shopFilter = useSelector((state) => state.shopFilter);
  const productsList = useSelector((state) => state.product.products);
  const categoriesList = useSelector((state) => state.category.categories);

  // for pagination
  const skip = useRef(0);
  let limit = 6;

  useEffect(() => {
    async function populate() {
      try {
        skip.current = 0;
        await dispatch(
          POPULATE_PRODUCTS_BY_SEARCH(skip.current, limit, shopFilter)
        );
      } catch (error) {
        dispatch(NOTIFY("" + error, "warning", 3));
      }
    }
    populate();
  }, [dispatch, shopFilter, skip, limit]);

  const loadMore = async () => {
    try {
      let toSkip = skip.current + limit;
      await dispatch(LOAD_MORE_PRODUCTS(toSkip, limit, shopFilter));
      skip.current = toSkip;
    } catch (error) {
      skip.current = 0;
      dispatch(NOTIFY("" + error, "warning", 3));
    }
  };

  const handleProductSearch = async (event) => {
    event.preventDefault();
    let params = {
      search: searchStr.value,
      category: optCategory.value || "All",
    };
    try {
      await dispatch(POPULATE_SEARCHED_PRODUCTS(params));
      resetFields();
    } catch (error) {
      dispatch(NOTIFY("" + error, "warning", 3));
    }
  };

  return (
    <Layout
      title="Marketplace"
      description="Browse the latest and best on devSOCKET"
    >
      <Form className="d-flex" onSubmit={handleProductSearch}>
        <Form.Select className="bg-light" {...optCategory}>
          <option value="All">All</option>
          {!isEmpty(categoriesList) &&
            categoriesList.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </Form.Select>

        <FormControl
          aria-label="Search bar to look for products"
          placeholder="Look for specific products"
          {...searchStr}
        />

        <Button type="submit" variant="outline-warning">
          <i className="fas fa-search fa-2x"></i>
        </Button>
      </Form>
      <Row>
        <Col xs={12} sm={4} className="mb-3">
          <ShopFilter />
        </Col>
        <Col xs={12} sm={8} className="mb-3">
          <p className="lead text-light">Shop</p>
          <Row xs={1} md={2} lg={3} className="g-3">
            {isEmpty(productsList) && (
              <p className="text-muted">No Products found</p>
            )}
            {!isEmpty(productsList) &&
              productsList.map((p, index) => (
                <Col key={index}>
                  <ProductCard key={p._id} product={p} />
                </Col>
              ))}
          </Row>

          <Button onClick={() => loadMore()} variant="outline-secondary">
            Load More
          </Button>
        </Col>
      </Row>
    </Layout>
  );
}

export default Shop;
