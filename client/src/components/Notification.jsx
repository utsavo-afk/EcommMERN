import React from "react";
import { Alert, CloseButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CLEAR_ALERT } from "../reducers/alertReducer";

function Notification({ alert: { msg, type } }) {
  const dispatch = useDispatch();
  return (
    <div
      className="text-center"
      style={{
        position: "fixed",
        top: 100,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <Alert
        variant={type}
        onClick={() => {
          dispatch(CLEAR_ALERT());
        }}
      >
        <div className="d-flex justify-content-between align-items-baseline">
          <Alert.Heading className="mb-0 lead">{msg}</Alert.Heading>
          <CloseButton />
        </div>
      </Alert>
    </div>
  );
}

export default Notification;
