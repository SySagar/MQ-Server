import { connect } from "amqplib";

// const queue = 'hello';

const getAllMessagesController = async (req,res) => {
  try {
    console.log("👋Hello there homie! We are Up! Try other routes like /publish or /subscribe")
    res.send("👋Hello there homie! We are Up! Try other routes like /publish or /subscribe")
  } catch (error) {
    console.log(error)
  }
   
  };

export default getAllMessagesController;