const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const amqplib = require("amqplib");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// RabbitMQ connection and message handling
async function connectRabbitMQ() {
  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("notifications");

    channel.consume("notifications", (msg) => {
      if (msg !== null) {
        const notification = JSON.parse(msg.content.toString());
        io.emit("notification", notification); 
        channel.ack(msg);
      }
    });

    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error.message);
  }
}

// Start the RabbitMQ connection
connectRabbitMQ();

// Start the server
const PORT = process.env.PORT; 
server.listen(PORT, () => {
  console.log(`Real-time service running on port ${PORT}`);
});
