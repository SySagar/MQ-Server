import { connect } from "amqplib";

// const queue = 'hello';

const subscribeMessage = async (req,res) => {
    try {
      const notificationQueue = req.body.notificationQueueID;
      const connection = await connect(process.env.CLOUDAMQP_URL);
      const channel = await connection.createChannel();

      process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });
      
      var notificationMessage;
      var retrievedMessage;
      var messages = [];
      // console.log("queue",channel)
      const consumption = async () => {

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
          }

          consumption().then(() => {

            if(messages.length==0)
            res.send("no new notification");
            else
            res.send(messages);
            setTimeout(async function () {
              await channel.close();
            await connection.close();
            console.log("Message Sent");
            }, 1000);
          })

  
      // console.log(" [*] Waiting for messages. To exit press CTRL+C");
    } catch (err) {
      console.warn(err);
    }
  };

export default subscribeMessage;