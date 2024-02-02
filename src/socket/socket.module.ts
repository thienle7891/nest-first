import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [SocketGateway],
})
export class SocketModule {}
