const customErrorHandler = (err, req, res, next) => {
  // MongoError
  if (err.name === "MongoError") {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        let error = error.errors[errName].message;
        return res.status(400).send({ error });
      } else {
        return res.status(400).send({ error: "MongoError occoured" });
      }
    }
  } else if (err.name === "ValidationError") {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        let error = err.errors[errName].message;
        return res.status(400).send(error);
      } else {
        return res.status(400).send({ error: "ValidationError occoured" });
      }
    }
  } else if (err.name === "CastError") {
    return res.status(400).send({
      error: "CastError occoured, invalid document id",
    });
  } else if (err.name === "UnauthorizedError") {
    return res.status(401).send({ error: "❌️ " + err.message });
  }
  next(err);
};

module.exports = customErrorHandler;
