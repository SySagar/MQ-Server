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
    await channel.assertQueue(uniqueQueueName,  { durable: true, autoDelete: true });

  // Send data to the queue
  const routingKey = uniqueQueueName;
  await channel.sendToQueue(routingKey, Buffer.from(JSON.stringify(queueMessage)),{ persistent: true });
  console.log("Message Sent");

  // Close the channel and connections
 
  setTimeout(async function () {
    await channel.close();
    await connection.close();
  }, 5000);


  res.send("Message Sent");
} catch (error) {
  console.log(error);
}
};

export default publishMessage;