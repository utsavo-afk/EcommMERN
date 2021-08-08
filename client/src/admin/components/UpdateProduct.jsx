import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components";
import { useField, useFileField } from "../../hooks";
import { NOTIFY } from "../../reducers/alertReducer";
import { POPULATE_CATEGORIES } from "../../reducers/categoryReducer";
import {
  ADMIN_UPDATE_PRODUCT,
  POPULATE_PRODUCT,
} from "../../reducers/productReducer";

function UpdateProduct({ match }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const categoryList = useSelector((state) => state.category.categories);
  useEffect(() => {
    async function populateProductAndCategories() {
      try {
        await dispatch(POPULATE_CATEGORIES());
        await dispatch(POPULATE_PRODUCT(match.params.id));
      } catch (error) {
        dispatch(NOTIFY("" + error, "warning", 2));
      }
    }
    populateProductAndCategories();
  }, [dispatch, match.params.id]);
  console.log(product);
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

  const updateProductHandler = async (event) => {
    event.preventDefault();
    let prodObj = {
      ...(name.value && { product_name: name.value }),
      ...(description.value && { description: description.value }),
      ...(price.value && { price: price.value }),
      ...(shipping.value && { shipping: Number(shipping.value) }),
      ...(category.value && { category: category.value }),
      ...(quantity.value && { quantity: quantity.value }),
      ...(photo && { photo: photo }),
    };
    let formData = new FormData();
    for (let key in prodObj) {
      formData.set(key, prodObj[key]);
    }
    try {
      await dispatch(ADMIN_UPDATE_PRODUCT(product._id, formData));
      dispatch(NOTIFY("Product Updated", "success", 3));
      resetAll();
    } catch (error) {
      dispatch(NOTIFY("" + error, "warning", 3));
    }
  };
  return (
    <Layout
      title="Update Product"
      description="Update product quantity, name, category and other details here."
    >
      {!isEmpty(categoryList) && !isEmpty(product) && (
        <Card>
          <Card.Body>
            <Card.Title className="text-muted">
              Update your product details
            </Card.Title>
            <Form onSubmit={updateProductHandler}>
              <FloatingLabel
                controlId="name"
                label="Product Name"
                className="mb-3"
              >
                <Form.Control {...name} placeholder="Product Name" />
                <Form.Text>{product.product_name}</Form.Text>
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
                <Form.Text>{product.description}</Form.Text>
              </FloatingLabel>
              <FloatingLabel label="Select a Category">
                <Form.Select
                  {...category}
                  className="mb-3"
                  aria-label="Category"
                >
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
                <Form.Text>💲{product.price}</Form.Text>
              </FloatingLabel>
              <FloatingLabel label="Select Shipping Availability">
                <Form.Select
                  {...shipping}
                  className="mb-3"
                  aria-label="Shipping"
                >
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
                <Form.Text>{product.quantity}</Form.Text>
              </div>
              <Form.Group controlId="photo" className="mb-3">
                <Form.Label>Upload Product photo</Form.Label>
                <Form.Control {...fileProps} name="photo" accept="image/*" />
              </Form.Group>
              <Button className="btn-dark" type="submit">
                <i className="fas fa-paper-plane text-warning"></i> Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Layout>
  );
}

export default UpdateProduct;
