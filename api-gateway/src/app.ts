const express = require("express");
const bodyParser = require("body-parser");
const sendMessage = require("./kafka/producer.ts");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/process", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).send("UserId and message are required");
  }

  // Determine service and send message to Kafka
  const service = message.includes("A") ? "serviceA" : "serviceB";

  // Send message to Kafka producer
  await sendMessage(service, { userId, message });

  return res.status(200).send("Message processed successfully");
});

app.listen(port, () => {
  console.log(`API Gateway running at http://localhost:${port}`);
});
