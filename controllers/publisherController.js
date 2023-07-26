import { connect } from "amqplib";

const publishMessage = async (req,res) => {
  try {
    const companyName = req.body.companyName;
    const queueName = req.body.queueName;
    const queueMessage = req.body.queueMessage;

    const connection = await connect(process.env.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    const uniqueQueueName = companyName + "-" + queueName;

    // console.log(msg)
    // connect to 'test-queue', create one if doesnot exist already
    await channel.assertQueue(uniqueQueueName, { durable: false });

    // send data to queue
    const routingKey = uniqueQueueName;
    const sendingMessage =async () => {
      channel.sendToQueue(routingKey, Buffer.from(JSON.stringify(queueMessage)), { persistent: true });
    }
    // close the channel and connections

    sendingMessage()

      // await channel.close();
      // await connection.close();
      setTimeout(async function () {
        await channel.connection.close();
      console.log("Message Sent");
        // callback(null, { message: 'queued' });
      }, 10000);


    res.send("Message Sent");
  } catch (error) {
    console.log(error);
  }
};

export default publishMessage;