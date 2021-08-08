import React, { useEffect } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "./../../components";
import { POPULATE_CATEGORIES } from "../../reducers/categoryReducer";
import { isEmpty } from "lodash";
import { useField, useFileField } from "./../../hooks/index";
import { CREATE_PRODUCT } from "./../../reducers/productReducer";
import { NOTIFY } from "../../reducers/alertReducer";

function CreateProduct() {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.category.categories);
  useEffect(() => {
    dispatch(POPULATE_CATEGORIES());
  }, [dispatch]);

  const reset = "reset";
  // product_name
  const { [reset]: resetName, ...name } = useField("text");
  // description
  const { [reset]: resetDescription, ...description } = useField("text");
  // price
  const { [reset]: resetPrice, ...price } = useField("number");
  // shipping
  const { [reset]: resetShipping, ...shipping } = useField("number");
  // quantity
  const { [reset]: resetQty, ...quantity } = useField("number");
  // category
  const { [reset]: resetCategory, ...category } = useField("text");
  // photo
  const {
    [reset]: resetPhoto,
    value: photo,
    ...fileProps
  } = useFileField("file");

  const resetAll = () => {
    resetName();
    resetDescription();
    resetPrice();
    resetCategory();
    resetQty();
    resetShipping();
  };

  const createProductHandler = async (event) => {
    event.preventDefault();
    let prodObj = {
      product_name: name.value,
      description: description.value,
      price: price.value,
      shipping: Number(shipping.value),
      category: category.value,
      quantity: quantity.value,
      photo: photo,
    };
    let formData = new FormData();
    for (let key in prodObj) {
      formData.set(key, prodObj[key]);
    }
    try {
      await dispatch(CREATE_PRODUCT(formData));
      dispatch(NOTIFY("Product Added", "success", 3));
      resetAll();
    } catch (error) {
      dispatch(NOTIFY("" + error, "warning", 3));
    }
  };

  return (
    <Layout title="Create Product" description="Add a new product here">
      <Card>
        <Card.Body>
          <Card.Title className="text-muted">
            Add a new product to your store
          </Card.Title>
          <Form onSubmit={createProductHandler}>
            <FloatingLabel
              controlId="name"
              label="Product Name"
              className="mb-3"
            >
              <Form.Control {...name} placeholder="Product Name" />
            </FloatingLabel>
            <FloatingLabel
              controlId="description"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                {...description}
                as="textarea"
                placeholder="Add a description"
              />
            </FloatingLabel>
            <FloatingLabel label="Select a Category">
              <Form.Select {...category} className="mb-3" aria-label="Category">
                <option>....</option>
                {!isEmpty(categoryList) &&
                  categoryList.map((c, index) => (
                    <option key={index} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="price" label="Price" className="mb-3">
              <Form.Control {...price} placeholder="Price" />
            </FloatingLabel>
            <FloatingLabel label="Select Shipping Availability">
              <Form.Select {...shipping} className="mb-3" aria-label="Shipping">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
            </FloatingLabel>
            <div className="mb-2">
              <Form.Label>
                Quantity{" "}
                <span className="bg-secondary text-light p-1 rounded">
                  {quantity.value || "0"}
                </span>
              </Form.Label>
              <Form.Range {...quantity} max="1000" />
            </div>
            <Form.Group controlId="photo" className="mb-3">
              <Form.Label>Upload Product photo</Form.Label>
              <Form.Control
                {...fileProps}
                name="photo"
                accept="image/*"
                required
              />
            </Form.Group>
            <Button className="btn-dark" type="submit">
              <i className="fas fa-paper-plane text-warning"></i> Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}

export default CreateProduct;
