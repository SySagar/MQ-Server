import express from "express";
import queueRoutes from "./routes/messageQueue.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 4002;

const corsOptions = {
  origin: '*',
  credentials:true
}

app.use(cors(corsOptions));

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(queueRoutes);

// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   next();
// })

// app.get("/send-msg", (req, res) => {
//     const data = {
//         title: "Six of Crows",
//         author: "Leigh Burdugo"
//     }

//     console.log("A message is sent to queue")
//     res.send("Message Sent");

// })

app.listen(PORT, () => console.log("Server running at port " + PORT));
