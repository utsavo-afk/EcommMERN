const app = require("./express");
const mongoose = require("mongoose");
const config = require("./configuration/config");

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  })
  .catch((err) => console.error(err));
