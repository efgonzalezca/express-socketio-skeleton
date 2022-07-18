import path from 'path';
import { Server as HTTPServer } from 'http';

import cors from 'cors';
import express, { Request, Response } from 'express';
import { Express } from 'express';
import { Server as IOServer } from 'socket.io';

import { Sockets } from './sockets';

export class Server {
  private server: HTTPServer;
  private app: Express;
  private port: string;
  private io: IOServer;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '4500';
    this.server = new HTTPServer(this.app);
    this.io = new IOServer(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve( __dirname, '../../public')));
    //add cors options - e.g. headers, whitelist
    this.app.use(cors({origin: "*", methods: ["GET", "OPTIONS", "POST"]}));
    this.app.get('/test', (_req: Request, res: Response) => {
      res.send({ status: 'ok' });
    });
  }

  socketsConfig(){
    new Sockets(this.io);
  }

  init() {
    this.middlewares();
    this.socketsConfig();
    this.server.listen( this.port, () => {
      console.log(`Server running on: http://localhost:${this.port}`);
    });
  }
}