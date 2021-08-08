const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const customErrorHandler = require("./utils/middleware/customErrorHandler");
const unknownEndpointError = require("./utils/middleware/unknownEndpointError");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/category.routes");
const productRouter = require("./routes/product.routes");
const paymentRouter = require("./routes/payment.routes");
const orderRouter = require("./routes/order.routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

// mount routes
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);
app.use("/", paymentRouter);
app.use("/", orderRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(customErrorHandler);
app.use(unknownEndpointError);

module.exports = app;
