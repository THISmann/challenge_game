import KafkaConfig from "./config.js";

const sendMessageToKafka = async (req, res) => {
  try {
    const { message } = req.body;
    const kafkaConfig = new KafkaConfig();
    const messages = [{ key: "key1", value: message }];
    kafkaConfig.produce("my-topic", messages);

    res.status(200).json({
      status: "Ok!",
      message: "Message successfully send!",
    });
  } catch (error) {
    console.log(error);
  }
};

const sendLogToKafka = async (req, res) => {
  try {
    const { key ,time, ip, message } = req.body;
    const kafkaConfig = new KafkaConfig();
    const logs = [{ key: key, time: time, ip: ip, message: message }];
    kafkaConfig.produce("topic-log", logs);

    res.status(200).json({
      status: "Ok!",
      message: "logs send !!!",
    });
  } catch (error) {
    console.log(error);
  }
};

const constrollers = { sendMessageToKafka, sendLogToKafka };

export default constrollers;
