import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {WebSocketServer} from "ws";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const corsOptions = {
    origin: "http://127.0.0.1:8080",
};

app.use(cors(corsOptions));

app.get("/start", (req, res) => res.send("Hello World"));

// Chat 

// Bc of how Node.js handles the upgrade from HTTP to WSS it might be easier to use a lib to create the WS Server

let webSocket = new WebSocketServer({port: 7071})

// Subscribing to the WS Server's connection

webSocket.on('connection', function connection(ws) {
    // Now we subscribe to the WS message event
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
  
    ws.send('something');
  });

app.listen(port, () => {
    console.log(`CORS enabled server listening on ${port}`);
});
 