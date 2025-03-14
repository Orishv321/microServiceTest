const cron = require("node-cron");
const { Client } = require("pg");
const updateSummary  = require("./summary")

const dbClient = new Client({
  user: "user",
  host: "localhost",
  database: "mydb",
  password: "pass",
  port: 5432,
});

dbClient.connect();

cron.schedule("*/5 * * * *", async () => {
  console.log("Running cron job to update summary table");
  await updateSummary(dbClient);
});
