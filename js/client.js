const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//AUDIO WHICH WILL PLAY WHEN RECIEVING MESSAGE
var audio = new Audio('ting.mp3');

//FUNCTION WHICH WILL APPEND EVENT INFO TO THE CONTAINER
const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {

        audio.play();
    }
}

//ASK NEW USE FOR THEIR NAME AND LET THE SERVER KNOW
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//IF A NEW USER JOINS RECIEVE HIS HER NAME FROM SERVER
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')

})

//IF SERVER SENDS A MESSAGE RECIEVE IT 
socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left')
})
// IF A USER LEAVES THE CHAT APPEND THE INFO TO THE CONTAINER
socket.on('left', name => {
    append(`${name} left the chat`, 'right')

})

//IF THE FORM GETS SUBMITTED, SEND SERVER THE MESSAGE
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''

})