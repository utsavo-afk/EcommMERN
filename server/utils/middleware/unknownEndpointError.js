const unknownEndpointError = (req, res) => {
  return res.status(404).send({ error: "❌️ 404, Not Found" });
};

module.exports = unknownEndpointError;
