import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ToShop() {
  return (
    <>
      <div style={{ position: "fixed", bottom: 80, right: 25 }}>
        <Button
          className="bg-dark border-0 rounded-circle"
          as={Link}
          to="/cart"
        >
          <i className="text-success fas fa-shopping-cart fa-sm"></i>
        </Button>
      </div>
    </>
  );
}
