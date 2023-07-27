import { connect } from "amqplib";

const publishMessage = async (req,res) => {
  try {
    const companyName = req.body.companyName;
    const queueMessage = req.body.queueMessage;

    const connection = await connect(process.env.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    const uniqueQueueName = companyName;

    // console.log(msg)
    // connect to 'test-queue', create one if doesnot exist already
    await channel.assertQueue(uniqueQueueName, { durable: true });

    // send data to queue
    const routingKey = uniqueQueueName;
    const sendingMessage =async () => {
       channel.sendToQueue(routingKey, Buffer.from(JSON.stringify(queueMessage)));
    }
    // close the channel and connections

    sendingMessage().then(() => {


      res.send("Message Sent");
       setTimeout(async function () {
        await channel.close();
      await connection.close();
      console.log("Message Sent");
      }, 1000);

    })
     


  } catch (error) {
    console.log(error);
  }
};

export default publishMessage;