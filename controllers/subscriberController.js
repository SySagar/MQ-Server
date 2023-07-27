import { connect } from "amqplib";

// const queue = 'hello';

const subscribeMessage = async (req,res) => {
    try {
      const notificationQueue = req.body.notificationQueueID;
      const connection = await connect(process.env.CLOUDAMQP_URL);
      const channel = await connection.createChannel();

      var notificationMessage;
      var retrievedMessage;
      var messages = [];
      // console.log("queue",channel)

      await channel.assertQueue(notificationQueue,  { durable: true, autoDelete: true });


        await channel.consume(
          notificationQueue,
          (message) => {
          // console.log("message",message)
          if (message) {

            retrievedMessage = JSON.parse(message.content.toString());
            messages.push(retrievedMessage)
            console.log("retrievedMessage",retrievedMessage)
            
            channel.ack(message); 
            // res.send(retrievedMessage)
            
          }
          
          // if(retrievedMessage.companyName === companyName){
            //   notificationMessage = retrievedMessage.queueMessage;
            // }
            // else
            // {
              //   notificationMessage = "No new notification";
              // }
            });
          

            // await channel.deleteQueue(notificationQueue);
            setTimeout(async function () {
              
              await channel.close();
            await connection.close();
            console.log("Message Sent");
            }, 7000);
          

          if(messages.length==0)
          res.send("no new notification");
          else
          res.send(messages);

  
      // console.log(" [*] Waiting for messages. To exit press CTRL+C");
    } catch (err) {
      console.warn(err);
    }
  };

export default subscribeMessage;