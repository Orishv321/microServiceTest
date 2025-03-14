const { Client } = require('pg');

const dbClient = new Client({
  user: "user",
  host: "localhost",
  database: "mydb",
  password: "pass",
  port: 5432,
});

dbClient.connect();

module.exports.handleMessage = async (message) => {
  const { service, payload } = message;

  const query = {
    text: "INSERT INTO messages(user_id, message, service) VALUES($1, $2, $3)",
    values: [payload.userId, payload.message, service],
  };

  try {
    await dbClient.query(query);
    console.log("Message stored in DB:", payload);
  } catch (err) {
    console.error("Error storing message:", err);
  }
};
