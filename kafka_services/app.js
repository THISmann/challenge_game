import express from "express";
import bodyParser from "body-parser";
import constrollers from "./controller.js";
import KafkaConfig from "./config.js";

const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, constrollers.sendMessageToKafka);
app.post("/api/log", jsonParser, constrollers.sendLogToKafka);

// consume from topic "test-topic"
const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (value) => {
  console.log(" Receive message: ", value);
});

app.listen(9090, () => {
  console.log(`Server is running on port 9090.`);
});
