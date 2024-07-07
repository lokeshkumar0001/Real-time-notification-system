module.exports = {
    paths: {
      "/api/notifications": {
        post: {
          summary: "Create a new notification",
          tags: ["Notifications"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Notification",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Notification created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Notification",
                  },
                },
              },
            },
            500: {
              description: "Internal server error",
            },
          },
        },
        get: {
          summary: "Get all notifications for the authenticated user",
          tags: ["Notifications"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "List of notifications",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Notification",
                    },
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
      "/api/notifications/{id}": {
        get: {
          summary: "Get a specific notification by ID",
          tags: ["Notifications"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "Notification ID",
            },
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Notification details",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Notification",
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
            404: {
              description: "Notification not found",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
        put: {
          summary: "Update a specific notification by ID",
          tags: ["Notifications"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "Notification ID",
            },
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Notification updated successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Notification",
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
            404: {
              description: "Notification not found",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
    },
  };
  