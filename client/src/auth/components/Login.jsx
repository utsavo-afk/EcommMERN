import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useField } from "./../../hooks/index";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../reducers/authReducer";
import { NOTIFY } from "../../reducers/alertReducer";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Layout } from "./../../components";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();

  const reset = "reset";
  const { [reset]: resetEmail, ...email } = useField("email");
  const { [reset]: resetPassword, ...password } = useField("password");

  const resetAll = () => {
    resetEmail();
    resetPassword();
  };

  const signinHandler = async (event) => {
    event.preventDefault();
    let credentials = {
      password: password.value,
      email: email.value,
    };
    try {
      await dispatch(SET_AUTH(credentials));
      resetAll();
      history.push(`${state?.from?.pathname || "/dashboard"}`);
    } catch ({ error }) {
      dispatch(NOTIFY("" + error, "warning", 3));
    }
  };

  return (
    <Layout title="Login" description="Signin to your account here">
      <Form onSubmit={signinHandler}>
        <FloatingLabel controlId="email" label="Email address" className="mb-3">
          <Form.Control {...email} placeholder="Email address" />
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control {...password} placeholder="Password" />
        </FloatingLabel>
        <Button className="btn-md btn-dark text-secondary" type="submit">
          <i className="fas fa-sign-in-alt text-warning"></i> LOGIN
        </Button>
        <Form.Text className="text-muted d-block">
          Don't have an Account? <Link to="/register">Signup</Link>
        </Form.Text>
      </Form>
    </Layout>
  );
}

export default Login;
