
module.exports.chatSockets = function(socketServer){
  //  let io = require('socket.io')(socketServer);
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
          }
      });
      io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            socket.join(data.chatroom);
             
            socket.broadcast.to(data.chatroom).emit('user_joined',data);
           // io.in(data.chatroom).emit('user_joined', data);        
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room  
       // socket.broadcast.to(data.room).emit('receive_message', data);    
       
        socket.on('send_message', function(data){
            socket.broadcast.to(data.chatroom).emit('receive_message', data);
           //io.in(data.chatroom).emit('receive_message', data);                ///    challenge             
        });                
                       
    });

}