const amqplib = require("amqplib");

let channelPromise;

async function connectRabbitMQ() {
  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("notifications");
    console.log("Connected to RabbitMQ and queue asserted successfully");

    // Handle connection closure
    connection.on("close", () => {
      console.error("RabbitMQ connection closed, retrying...");
      reconnectRabbitMQ();
    });

    // Handle connection errors
    connection.on("error", (err) => {
      console.error("RabbitMQ connection error", err);
      reconnectRabbitMQ();
    });

    channelPromise = Promise.resolve(channel);
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    setTimeout(connectRabbitMQ, 5000); // Retry after 5 seconds
  }
}

function reconnectRabbitMQ() {
  channelPromise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        console.log("Attempting to reconnect to RabbitMQ...");
        await connectRabbitMQ();
        resolve(channelPromise);
      } catch (err) {
        reject(err);
      }
    }, 5000);
  });
}

module.exports = { connectRabbitMQ, getChannelPromise: () => channelPromise };
