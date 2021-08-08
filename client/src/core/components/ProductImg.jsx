import React from "react";
import { Image } from "react-bootstrap";

function ProductImg({ id, name }) {
  return <Image src={`/api/products/photo/${id}`} alt={name} fluid />;
}

export default ProductImg;
