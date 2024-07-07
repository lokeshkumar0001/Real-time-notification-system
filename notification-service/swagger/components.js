module.exports = {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Notification: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "ID of the user receiving the notification",
            },
            message: {
              type: "string",
              description: "Notification message",
            },
            read: {
              type: "boolean",
              description: "Read status of the notification",
            },
          },
          required: ["userId", "message"],
        },
      },
    },
  };
  