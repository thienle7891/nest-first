import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const mess = ['message1', 'message2', 'message3'];

@WebSocketGateway(8001, {
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });

    mess.forEach((messageName) => {
      this.createSubscribeMessageHandler(messageName);
    });
  }

  private createSubscribeMessageHandler(messageName: string): void {
    const handlerMethodName = `handle${messageName.charAt(0).toUpperCase()}${messageName.slice(1)}`;

    // Dynamically create a method with the SubscribeMessage decorator
    SocketGateway.prototype[handlerMethodName] = function (): void {
      console.log(`Handling ${messageName}`);
      //   this.server.emit(messageName, data);
    };

    // Apply the SubscribeMessage decorator to the dynamically created method
    SubscribeMessage(messageName)(
      SocketGateway.prototype,
      handlerMethodName,
      Object.getOwnPropertyDescriptor(
        SocketGateway.prototype,
        handlerMethodName
      )
    );
  }

  @SubscribeMessage('message1')
  handleMessage(@MessageBody() data: string): void {
    console.log(111);
    this.server.emit('message', data);
  }
}
