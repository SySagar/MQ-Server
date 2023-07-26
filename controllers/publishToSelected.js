import { connect } from 'amqplib';

const exchangeName = "logs";
const msg = 'You are selected for the interview';

const publishToSelected = async (req,res) => {
try {
  

  const {candidateID} = req.body;
  const connection = await connect(process.env.CLOUDAMQP_URL);
  const channel = await connection.createChannel();

  const routingKey = candidateID;

  await channel.assertExchange(exchangeName, 'direct', {durable: false});
  await channel.assertQueue(routingKey, { durable: false },{exclusive: true});
  await channel.bindQueue(candidateID, exchangeName, routingKey);
  await channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(msg)));
  console.log('Sent: ', msg);
  
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 10000)

  res.send("Message Sent to exhange");
} catch (error) {
  console.log(error) 
}
}

export default publishToSelected;