import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { NOTIFY } from "../../reducers/alertReducer";
import { useField } from "./../../hooks/index";
import { PromptModal } from "./../../components";
import { signup } from "../api";
import { Layout } from "./../../components";

function Signup() {
  const [showPrompt, setShowPrompt] = useState(false);
  const dispatch = useDispatch();

  const reset = "reset";
  const { [reset]: resetName, ...name } = useField("text");
  const { [reset]: resetEmail, ...email } = useField("email");
  const { [reset]: resetPassword, ...password } = useField("password");
  const { [reset]: resetPassword2, ...confirmPassword } = useField("password");

  const resetAll = () => {
    resetName();
    resetEmail();
    resetPassword();
    resetPassword2();
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    if (password.value !== confirmPassword.value) {
      resetPassword();
      resetPassword2();
      return dispatch(NOTIFY("Passwords don't match", "warning", 2));
    }
    const credentials = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    try {
      await signup(credentials);
      setShowPrompt(true);
      resetAll();
    } catch (error) {
      dispatch(NOTIFY("" + error, "warning", 3));
    }
  };

  return (
    <Layout title="Signup" description="Create your account here">
      <Form onSubmit={signupHandler}>
        <FloatingLabel controlId="name" label="Name" className="mb-3">
          <Form.Control {...name} placeholder="Name" />
        </FloatingLabel>
        <FloatingLabel controlId="email" label="Email address" className="mb-3">
          <Form.Control {...email} placeholder="Email address" />
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control {...password} placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel
          controlId="confirmPassword"
          label="Confirm Password"
          className="mb-3"
        >
          <Form.Control {...confirmPassword} placeholder="Confirm Password" />
        </FloatingLabel>
        <Button className="btn-md btn-dark text-secondary" type="submit">
          <i className="fa fa-user-plus text-warning" aria-hidden="true"></i>{" "}
          REGISTER
        </Button>
        <Form.Text className="text-muted d-block">
          Don't have an Account? <Link to="/login">Login</Link>
        </Form.Text>
      </Form>

      <PromptModal show={showPrompt} onHide={() => setShowPrompt(false)} />
    </Layout>
  );
}

export default Signup;
