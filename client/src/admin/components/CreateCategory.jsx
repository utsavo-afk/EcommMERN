import React from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Layout } from "./../../components";
import { useField } from "../../hooks";
import { NOTIFY } from "../../reducers/alertReducer";
import { CREATE_CATEGORY } from "../../reducers/categoryReducer";

function CreateCategory() {
  const dispatch = useDispatch();

  const reset = "reset";
  const { [reset]: resetCategory, ...category } = useField("text");

  const newCategoryHandler = async (event) => {
    event.preventDefault();
    let newCategory = {
      name: category.value,
    };
    try {
      await dispatch(CREATE_CATEGORY(newCategory));
      dispatch(NOTIFY("Category Added", "success", 3));
      resetCategory();
    } catch ({ error }) {
      dispatch(NOTIFY("" + error, "warning", 3));
    }
  };

  return (
    <Layout
      title="Create Category"
      description="Add a new product category here"
    >
      <Card>
        <Card.Body>
          <Card.Title className="text-muted">
            Add a new category to your store
          </Card.Title>
          <Form onSubmit={newCategoryHandler}>
            <FloatingLabel
              controlId="category"
              label="Category"
              className="mb-3"
            >
              <Form.Control {...category} placeholder="Category" />
            </FloatingLabel>
            <Button className="btn-dark" type="submit">
              <i className="fas fa-paper-plane text-warning"></i> Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}

export default CreateCategory;
