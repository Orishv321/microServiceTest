import { Consumer, KafkaClient } from 'kafka-node';
import { handleMessage } from './service.ts';
import { Client } from 'pg';

const client = new KafkaClient({ kafkaHost: 'localhost:9093' });
const consumer = new Consumer(
  client,
  [{ topic: 'processing_topic', partition: 0 }],
  { autoCommit: true }
);

consumer.on('message', (message) => {
  const parsedMessage = JSON.parse(message.value as string);
  handleMessage(parsedMessage);
});

consumer.on('error', (err) => {
  console.error('Kafka error:', err);
});
