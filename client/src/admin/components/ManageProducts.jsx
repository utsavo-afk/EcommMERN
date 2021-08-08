import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components";
import { NOTIFY } from "../../reducers/alertReducer";
import {
  ADMIN_DELETE_PRODUCT,
  POPULATE_ALL_PRODUCTS_ADMIN,
} from "../../reducers/productReducer";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function ManageProducts() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.product.products);
  useEffect(() => {
    async function populateProducts() {
      try {
        await dispatch(POPULATE_ALL_PRODUCTS_ADMIN());
      } catch ({ error }) {
        dispatch(NOTIFY("" + error, "warning", 2));
      }
    }
    populateProducts();
  }, [dispatch]);

  const deleteProduct = async (productId) => {
    try {
      await dispatch(ADMIN_DELETE_PRODUCT(productId));
      dispatch(NOTIFY("Product Deleted", "secondary", 2));
    } catch (error) {
      dispatch(NOTIFY("" + error, "warning", 2));
    }
  };

  return (
    <Layout
      title="Manage Inventory"
      description="Manage Store inventory and update store products"
    >
      <p className="lead">Manage Store Inventory</p>
      <Table striped responsive size="sm">
        <thead>
          <tr className="text-center">
            <th>Item No.</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Created At</th>
            <th>Price</th>
            <th>Shipping</th>
            <th>Quantity</th>
            <th>Units Sold</th>
            <th>Actions</th>
          </tr>
        </thead>
        {!isEmpty(productsList) && (
          <tbody>
            {productsList.map((p, index) => (
              <tr className="text-center" key={index} id={p._id}>
                <td>{index + 1}</td>
                <td>{p.product_name}</td>
                <td>{p.category.name}</td>
                <td>{<Moment format="YYYY-DD-MM">{p.createdAt}</Moment>}</td>
                <td>💲{p.price}</td>
                <td>{p.shipping ? "Available" : "Not Available"}</td>
                <td>{p.quantity || "Out of Stock"}</td>
                <td>{p.sold}</td>
                <td>
                  <div className="d-flex align-items-baseline">
                    <Button
                      as={Link}
                      to={`/update/product/${p._id}`}
                      className="btn-sm mx-1"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => deleteProduct(p._id)}
                      className="btn-sm btn-danger"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {isEmpty(productsList) && <p>There are no products in the store</p>}
    </Layout>
  );
}

export default ManageProducts;
