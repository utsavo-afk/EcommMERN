import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { LOGOUT } from "../reducers/authReducer";
import { Notification } from "./../components/index";

function Navigation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useSelector((state) => state.alert);
  const auth = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.count);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            className="d-none d-md-block"
            as={NavLink}
            to="/"
            href="#"
          >
            <span className="display-4 text-warning">
              🔥<small className="text-muted">dev</small>ROCKET
            </span>
          </Navbar.Brand>
          {auth?.user && (
            <Nav.Item className="justify-content-end">
              <Navbar.Text>
                Signed in as:{" "}
                <Link to="/dashboard" className="text-warning">
                  {auth?.user.name}
                </Link>
                <i
                  className="fas fa-sign-out-alt fa-lg mx-2"
                  onClick={() => dispatch(LOGOUT(history))}
                ></i>
              </Navbar.Text>
            </Nav.Item>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Item className="d-md-none">
                <Nav.Link as={NavLink} to="/" href="#">
                  <span className="lead text-light">
                    <i
                      className="fa fa-home text-muted mx-1"
                      aria-hidden="true"
                    ></i>
                    HOME
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/shop" href="#">
                  <span className="lead text-light">
                    <i
                      className="fas fa-store text-muted mx-1"
                      aria-hidden="true"
                    ></i>
                    SHOP
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/cart" href="#">
                  <span className="lead text-light">
                    <i
                      className="fas fa-shopping-cart text-muted mx-1"
                      aria-hidden="true"
                    ></i>
                    CART{" "}
                    <Badge bg="danger" className="rounded-circle">
                      {items}
                    </Badge>
                  </span>
                </Nav.Link>
              </Nav.Item>
              {!auth?.user && (
                <>
                  <Nav.Item>
                    <Nav.Link as={NavLink} to="/login" href="#">
                      <span className="lead text-light">
                        <i className="fas fa-sign-in-alt text-muted mx-1"></i>
                        LOGIN
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={NavLink} to="/register" href="#">
                      <span className="lead text-light">
                        <i
                          className="fa fa-user-plus text-muted mx-1"
                          aria-hidden="true"
                        ></i>
                        REGISTER
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
              {auth?.user && (
                <>
                  <Nav.Item className="me-2">
                    <Nav.Link as={NavLink} to="/dashboard" href="#">
                      <span className="lead text-light">
                        <i
                          className="fas fa-shopping-cart text-muted mx-1"
                          aria-hidden="true"
                        ></i>
                        DASHBOARD
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {alert?.msg !== undefined && <Notification alert={alert} />}
    </>
  );
}

export default Navigation;
