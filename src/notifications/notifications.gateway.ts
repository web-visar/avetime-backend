// import { Logger } from '@nestjs/common';
// import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway()
// export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   private readonly logger = new Logger(NotificationsGateway.name);

//   // 1. Triggered when the gateway is initialized
//   afterInit(server: Server) {
//     this.logger.log('Notifications Gateway Initialized');
//   }

//   // 2. Triggered when a new client connects
//   handleConnection(client: Socket, ...args: any[]) {
//     this.logger.log(`Client connected: ${client.id}`);

//     // Example: send a welcome message to the specific client
//     client.emit('welcome', { message: 'Connected to Notifications' });
//   }

//   // 3. Triggered when a client disconnects
//   handleDisconnect(client: Socket) {
//     this.logger.log(`Client disconnected: ${client.id}`);
//   }
// }
