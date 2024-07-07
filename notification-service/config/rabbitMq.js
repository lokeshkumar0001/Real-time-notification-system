const amqp = require("amqplib");

async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost"); // Replace with your RabbitMQ server URL
    const channel = await connection.createChannel();

    await channel.assertQueue('notifications');

    
    console.log("Connected to RabbitMQ");
    return channel
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

module.exports = connectToRabbitMQ
