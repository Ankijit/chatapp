import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import 'dotenv/config'

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static("public"));
app.set(app.set("view engine", "ejs"));



import mongoose from 'mongoose';
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECT_URI);
  console.log("connected")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const mschema = new mongoose.Schema(
  {
    message: {
      type:String,
      required: [true,"message"]
    },
  },
  { versionKey: false }
);



const messages = mongoose.model("newmessage", mschema);

app.get('/', (req, res) => {
  messages.find({})
.then(function(docs) {
  res.render("index.ejs", { docs1: docs });
  
   
  })
  .catch(function(error) {
    console.log(error);
    
  });
 
  
})








io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    const message1 = new messages({
      message: msg,
    });
    message1.save();
    io.emit('chat message',msg );

    

   
  })
    
  })

   


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
