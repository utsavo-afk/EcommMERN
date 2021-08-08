const logger = {
  info(...params) {
    if (process.env.NODE_ENV === "development") {
      console.log(...params);
    }
  },
  error(...params) {
    if (process.env.NODE_ENV === "development") {
      console.error(...params);
    }
  },
};

module.exports = logger;
