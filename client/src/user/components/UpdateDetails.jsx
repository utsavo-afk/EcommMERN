import React from "react";
import { Layout } from "../../components";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NOTIFY } from "../../reducers/alertReducer";
import { update } from "../api";
import { LOGOUT } from "../../reducers/authReducer";
import { useHistory } from "react-router";
import { useField } from "../../hooks";

function UpdateDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  const reset = "reset";
  const { [reset]: resetName, ...name } = useField("text");
  const { [reset]: resetEmail, ...email } = useField("email");
  const { [reset]: resetPassword, ...password } = useField("password");

  const resetAll = () => {
    resetName();
    resetEmail();
    resetPassword();
  };

  const updateUserDetails = async (event) => {
    event.preventDefault();
    let data = {
      ...(name.value && { name: name.value }),
      ...(email.value && { email: email.value }),
      ...(password.value && { password: password.value }),
    };
    try {
      // update req
      await update(data);
      resetAll();
      // logout user
      dispatch(NOTIFY("User Details Updated, Please Log-in", "success", 2));
      dispatch(LOGOUT(history));
    } catch (error) {
      dispatch(NOTIFY("" + error, "warning", 2));
    }
  };

  return (
    <Layout title="Update Profile" description="Update your user details here">
      <Form onSubmit={updateUserDetails}>
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Update Name</Form.Label>
          <Form.Control {...name} placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control {...email} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Update Password</Form.Label>
          <Form.Control {...password} placeholder="Enter password" />
        </Form.Group>
        <Button type="submit" className="btn-dark text-warning">
          Update
        </Button>
        <p className="text-muted">You will need to sign-in again.</p>
      </Form>
    </Layout>
  );
}

export default UpdateDetails;
