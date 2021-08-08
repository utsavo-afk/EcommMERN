import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function PromptModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Signup Successful
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Proceed to Login with your credentials</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-dark"
          as={Link}
          to="/login"
          onClick={props.onHide}
        >
          <i className="fas fa-sign-in-alt text-warning"></i> Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PromptModal;
