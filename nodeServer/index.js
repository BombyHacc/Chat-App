const { Socket } = require('socket.io');

//Node server which will handle socket io connections
const io=require('socket.io')(8000)

const users={};

io.on('connection', socket =>{
    //IF ANY NEW USER JOINS, LET OTHER USERS CONNECTED TO THE SERVER KNOW
    socket.on('new-user-joined', name =>{
       
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
        

    });
    //IF SOMEONE SENDS A MESSAGE, BROADCAST TO OTHER PEOPLE
    socket.on('send', message=>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });
    //IF SOMEONE LEAVES THE CHAT LET OTHERS KNOW
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})