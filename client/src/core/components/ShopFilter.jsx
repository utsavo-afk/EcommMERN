import React, { useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NOTIFY } from "../../reducers/alertReducer";
import { POPULATE_CATEGORIES } from "../../reducers/categoryReducer";
import {
  ADD_CATEGORY,
  ADD_PRICE_RANGE,
  REMOVE_CATEGORY,
} from "../../reducers/shopFilterReducer";
import { priceRange } from "./price-helper";

function ShopFilter() {
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state) => state.shopFilter.category);
  const categoriesList = useSelector((state) => state.category.categories);

  useEffect(() => {
    async function populate() {
      try {
        await dispatch(POPULATE_CATEGORIES());
      } catch ({ error }) {
        dispatch(NOTIFY("" + error, "warning", 3));
      }
    }
    populate();
  }, [dispatch]);

  return (
    <>
      <p className="lead text-light">Filter Products</p>
      <Card className="bg-light mb-2">
        <Card.Body>
          <Form>
            <Form.Text>Filter by Category</Form.Text>
            <hr />

            {categoriesList &&
              categoriesList.map((c, index) => (
                <Form.Check
                  inline
                  onChange={({ target }) => {
                    if (target.checked && !categoryFilter.includes(c._id))
                      dispatch(ADD_CATEGORY(c._id));
                    if (!target.checked && categoryFilter.includes(c._id))
                      dispatch(REMOVE_CATEGORY(c._id));
                  }}
                  key={index}
                  label={c.name}
                  name="category"
                  type="checkbox"
                />
              ))}
          </Form>
        </Card.Body>
      </Card>
      <Card className="bg-light">
        <Card.Body>
          <Form>
            <Form.Text>Filter by Price</Form.Text>
            <hr />
            {priceRange.map((price, index) => (
              <Form.Check
                inline
                key={price._id}
                label={price.name}
                value={price.range}
                name="price"
                type="radio"
                onChange={() => dispatch(ADD_PRICE_RANGE(price.range))}
              />
            ))}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default ShopFilter;
