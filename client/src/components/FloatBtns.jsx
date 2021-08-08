import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function FloatBtns() {
  const items = useSelector((state) => state.cart.count);

  const [isVisible, setIsVisible] = useState(false);
  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="d-flex flex-column align-items-center"
          style={{ position: "fixed", bottom: 20, right: 10 }}
        >
          <Button
            variant="outline-light"
            className="my-2 border-0"
            as={Link}
            to="/cart"
          >
            <i className="me-1 text-success fas fa-shopping-cart fa-lg"></i>
            <Badge bg="danger" className="rounded-circle">
              {items}
            </Badge>
          </Button>
          <Button
            variant="outline-dark"
            className="border-0 rounded-circle align-self-center"
            onClick={scrollToTop}
          >
            <i className="text-warning fas fa-arrow-up fa-2x"></i>
          </Button>
        </div>
      )}
    </>
  );
}
