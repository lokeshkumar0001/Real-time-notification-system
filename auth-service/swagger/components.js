module.exports = {
  schemas: {
    User: {
      type: "object",
      properties: {
        username: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};
