import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import cartHelper from "../cart/cart-helper";
import { Navigation } from "../core";
import { IS_TOKEN_EXPIERD, IS_USER_CACHED } from "../reducers/authReducer";
import { POPULATE_CART_FROM_CACHE } from "../reducers/cartReducer";
import Footer from "./Footer";
import "./Layout.css";
import FloatBtns from "./FloatBtns";
function Layout({
  title = "Title",
  description = "Description",
  className,
  children,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(IS_USER_CACHED());
  }, [dispatch]);

  useEffect(() => {
    dispatch(IS_TOKEN_EXPIERD(history));
  }, [dispatch, history]);

  useEffect(() => {
    cartHelper.createCart();
  }, []);

  useEffect(() => {
    dispatch(POPULATE_CART_FROM_CACHE());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <div className="p-4 mb-4 bg-light jumbotron">
        <Container>
          <div className="d-md-flex align-items-baseline">
            <div className="container-fluid py-5">
              <p className="display-1">{title}</p>
              <p className="text-light">{description}</p>
            </div>
            <div className="d-flex">
              <Button
                onClick={() => history.goBack()}
                className="me-2 btn-dark"
              >
                Back
              </Button>
              <Button onClick={() => history.push("/")} className="btn-warning">
                Home
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={className}>{children}</div>
        <hr />
      </Container>
      <Footer />
      <FloatBtns />
    </>
  );
}

export default Layout;
