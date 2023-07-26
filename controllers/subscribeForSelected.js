import amqplib from 'amqplib';

const exchangeName = "logs";

const subscribeForSelected = async (req,res) => {

  try {
    

    const {candidateID} = req.body;
    const queueName = candidateID;
  const connection = await amqplib.connect(process.env.CLOUDAMQP_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'direct', {durable: false},{exclusive: true});
  
 
  channel.bindQueue(queueName, exchangeName, candidateID);
  channel.consume(queueName, msg => {
    if(msg.content) console.log("THe message is: ", msg.content.toString());
    channel.ack(msg); 
  })

  // await channel.deleteQueue(queueName);

  setTimeout(async() => {
    
    await channel.deleteQueue(queueName);
    connection.close();
    process.exit(0);
  }, 10000)

      res.send("received");
    } catch (error) {
    res.send(error);
    }
}

export default subscribeForSelected;