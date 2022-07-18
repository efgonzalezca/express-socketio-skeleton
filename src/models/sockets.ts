import {Server as IOServer, Socket} from 'socket.io';

export class Sockets {
  
  private io: IOServer;

  constructor(io: IOServer) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log('Client connected ' + socket.id);
      
      socket.on('msg-to-server', (data: Object) => {
        console.log(data);
      })

      socket.emit('test', {name: "Desarrollo & Analítica", date: new Date()});
    });
  }
}