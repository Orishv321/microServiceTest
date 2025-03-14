import { KafkaClient, Producer } from "kafka-node";

const client = new KafkaClient({ kafkaHost: "localhost:9093" });
const producer = new Producer(client);

const sendMessage = (service, payload) => {
  return new Promise<void>((resolve, reject) => {
    const message = { service, payload };
    producer.send(
      [
        {
          topic: "processing_topic",
          messages: JSON.stringify(message),
        },
      ],
      (err, data) => {
        if (err) return reject(err);
        console.log("Message sent to Kafka:", data);
        resolve();
      }
    );
  });
};

module.exports = sendMessage;
